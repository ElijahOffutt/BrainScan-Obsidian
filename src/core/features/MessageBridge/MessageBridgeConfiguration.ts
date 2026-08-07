

export default class MessageBridgeConfiguration {

    constructor() {}

    configure(): void {
        // Configure the message bridge here
    }

    allowedOrigin: string = '*'; // Allow all origins by default
    getAllowedOrigin(): string { return this.allowedOrigin; }   

}