// BridgeService.ts

let instance: BridgeService | null = null;

class BridgeService {

    // Track all registered iframes by a label so we can target or broadcast
    private iframes: Map<string, HTMLIFrameElement> = new Map();

    // Bound reference kept so we can cleanly remove the listener later
    private boundHandler = this.handleMessage.bind(this);

    private constructor() {
        // Only one message listener needed — it broadcasts to all registered iframes
        window.addEventListener('message', this.boundHandler);
    }

    static getInstance(): BridgeService {
        if (!instance) {
            instance = new BridgeService();
        }
        return instance;
    }

    // Each view registers itself with a unique label when it opens
    register(id: string, iframe: HTMLIFrameElement): void {
        this.iframes.set(id, iframe);
        console.log(`BrainScan: registered iframe "${id}"`);
    }

    // Each view deregisters itself when it closes
    unregister(id: string): void {
        this.iframes.delete(id);
        console.log(`BrainScan: unregistered iframe "${id}"`);

        // Clean up the global listener only when no views are left
        if (this.iframes.size === 0) {
            window.removeEventListener('message', this.boundHandler);
            instance = null;
        }
    }

    // Central router
    private async handleMessage(event: MessageEvent): Promise<void> {
        const { type, payload } = event.data;

        switch (type) {
            case 'PING':
                await this.handlePing(payload);
                break;
            default:
                console.warn(`BrainScan BridgeService: unhandled type "${type}"`);
        }
    }

    // Send to one specific view by id
    private replyTo(id: string, type: string, payload: unknown): void {
        const iframe = this.iframes.get(id);
        if (!iframe?.contentWindow) return;
        iframe.contentWindow.postMessage({ type, payload }, 'http://localhost:4200');
    }

    // Send to every registered view — use this for sync/state events
    broadcast(type: string, payload: unknown): void {
        this.iframes.forEach((iframe) => {
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage({ type, payload }, 'http://localhost:4200');
            }
        });
    }

    // --- Handlers --- //

    private async handlePing(payload: unknown): Promise<void> {
        console.log('BrainScan: ping received', payload);
        // Broadcast the pong so both views hear it
        this.broadcast('PONG', { message: 'Obsidian says hi' });
    }
}

const BridgeServiceInstance = BridgeService.getInstance();

export default BridgeServiceInstance as BridgeService;