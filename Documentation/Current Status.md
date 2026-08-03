# BrainScan — Dev Status

## Where I Left Off

Got the core development workflow locked in and the iframe bridge architecture working end to end. HMR is live, messages are passing between Angular and Obsidian, and the bridge layer is structured cleanly enough to build on top of.

---

## What's Working

### Dev Workflow

Angular runs as a completely separate repo (`BSOP-Angular`) using `ng serve` on `localhost:4200`. The Obsidian plugin loads that URL directly into an `<iframe>` inside the plugin view. Hot Module Reload works out of the box because Angular handles that internally over its own websocket — Obsidian just hosts the frame.

Two VS Code windows, one per repo. Changes to the Angular side reflect instantly in Obsidian without reloading the plugin.

### The iframe Bridge

The Angular app and the Obsidian plugin live in separate browser contexts — the iframe gets its own `window`. They communicate via the browser `postMessage` / `message event` API.

- Angular sends up with `window.parent.postMessage({ type, payload }, origin)`
- Obsidian listens on its own `window` with `addEventListener('message', ...)`
- Obsidian replies back down with `iframe.contentWindow.postMessage({ type, payload }, origin)`

`window.parent` inside an iframe always returns the containing window — in this case the Obsidian Electron window. This is the standard browser mechanism for safe cross-frame communication and it works identically in Electron.

### Production Path

In dev the iframe `src` points at `localhost:4200`. In production it will point at the bundled Angular `dist/` folder shipped inside the plugin directory, resolved via `this.app.vault.adapter.getResourcePath(...)`. The `postMessage` contract stays identical — only the origin string changes. The `IS_DEV` flag will be replaced with a build-time constant baked in by esbuild so the wrong branch is stripped at build time.

---

## Architecture — Bridge Layer

Decided to give the bridge its own feature directory at `src/features/bridge/` since it will grow to include configuration, logging, and session state.

### Why This Split

The bridge is split across two classes with distinct responsibilities:

**`BridgeService`** — singleton, infrastructure only. Owns the `window` message listener, the iframe registry, and the raw send/receive mechanics. It doesn't know or care what any message means.

**`BridgeController`** — one instance per view. Owns message routing logic for that view. When a message arrives the service looks up which handler is registered for that iframe and calls it. The controller handles the type switch, calls into whatever service it needs, then uses `BridgeService.replyTo()` or `BridgeService.broadcast()` to send back.

The service never imports the controller. The controller registers a plain handler function — `this.handle.bind(this)` — so the service has no coupling to the controller type at all.

### How the Service Identifies Which View Sent a Message

Rather than requiring Angular to self-identify in the payload, the service matches `event.source` (the window the message came from) against the `contentWindow` of each registered iframe. This means the routing is transparent — Angular just sends a message, the service figures out which view it came from automatically.

### Multiple Views

Both the sidebar leaf view and the settings view each instantiate their own `BridgeController` with a unique id (`'sidebar'`, `'settings'`). Each registers its iframe and handler with the singleton `BridgeService`. Broadcast events go to all registered iframes simultaneously — useful for state sync. Targeted replies go to one specific view via `replyTo(id, ...)`.

---

## Current File Shape

```
src/
  features/
    bridge/
      BridgeService.ts     ← singleton, message transport
      BridgeController.ts  ← per-view, message routing
  views/
    BrainScanPluginView.ts ← sidebar leaf view
```

---

## BridgeService (current)

```typescript
type MessageHandler = (type: string, payload: unknown) => Promise<void>;

class BridgeService {
    private iframes: Map<string, HTMLIFrameElement> = new Map();
    private handlers: Map<string, MessageHandler> = new Map();
    private boundHandler = this.handleMessage.bind(this);

    private constructor() {
        window.addEventListener('message', this.boundHandler);
    }

    static getInstance(): BridgeService {
        if (!instance) instance = new BridgeService();
        return instance;
    }

    register(id: string, iframe: HTMLIFrameElement, handler: MessageHandler): void {
        this.iframes.set(id, iframe);
        this.handlers.set(id, handler);
    }

    unregister(id: string): void {
        this.iframes.delete(id);
        this.handlers.delete(id);
        if (this.iframes.size === 0) {
            window.removeEventListener('message', this.boundHandler);
            instance = null;
        }
    }

    private async handleMessage(event: MessageEvent): Promise<void> {
        const id = [...this.iframes.entries()]
            .find(([, iframe]) => iframe.contentWindow === event.source)?.[0];
        if (!id) return;
        const handler = this.handlers.get(id);
        await handler?.(event.data.type, event.data.payload);
    }

    replyTo(id: string, type: string, payload: unknown): void {
        const iframe = this.iframes.get(id);
        if (!iframe?.contentWindow) return;
        iframe.contentWindow.postMessage({ type, payload }, 'http://localhost:4200');
    }

    broadcast(type: string, payload: unknown): void {
        this.iframes.forEach((iframe) => {
            iframe.contentWindow?.postMessage({ type, payload }, 'http://localhost:4200');
        });
    }
}

const bridgeService = BridgeService.getInstance();
export default bridgeService;
```

---

## BridgeController (current)

```typescript
import bridgeService from './BridgeService';

export default class BridgeController {

    constructor(private id: string) {}

    register(iframe: HTMLIFrameElement): void {
        bridgeService.register(this.id, iframe, this.handle.bind(this));
    }

    unregister(): void {
        bridgeService.unregister(this.id);
    }

    async handle(type: string, payload: unknown): Promise<void> {
        switch (type) {
            case 'PING':
                bridgeService.replyTo(this.id, 'PONG', { message: 'pong' });
                break;
            default:
                console.warn(`BridgeController [${this.id}]: unhandled type "${type}"`);
        }
    }
}
```

---

## Next Steps

- [ ] Add origin validation to `handleMessage` — lock to `localhost:4200` in dev, `app://obsidian.md` in prod
- [ ] Wire `IS_DEV` to an esbuild define so it's a true build-time constant
- [ ] Build out `handle()` in the controller with real message types beyond PING
- [ ] Add logging to the bridge — store message history in a repository class inside the bridge feature
- [ ] Add the settings view and wire its own `BridgeController` instance
- [ ] Test production build path via `getResourcePath` in a second vault