import { Notice } from 'obsidian';

import BridgeService from './MessageBridgeService';

export default class BridgeController   {

    private static instance: BridgeController | null = null;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public static getInstance(): BridgeController {
        if (!BridgeController.instance) {
            BridgeController.instance = new BridgeController();
        }
        return BridgeController.instance;
    }

    public registerInterface(id: string, iframe: HTMLIFrameElement): void {
        BridgeService.register(id, iframe);
    }  
    
    public unregisterInterface(id: string): void {
        BridgeService.unregister(id);
    }

    public RouteMessage(event: MessageEvent): void {
        switch (event.data.route) {
            default:
                new Notice('Unrecognized route: ' + event.data.route);
                console.warn('Unrecognized route: ' + event.data.route);
        }       
    }   

}