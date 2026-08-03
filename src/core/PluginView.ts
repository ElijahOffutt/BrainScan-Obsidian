import { ItemView, WorkspaceLeaf, Notice } from 'obsidian';

export const VIEW_TYPE_PLUGIN = 'plugin-view'; // UNIQUE-ID for your view type

export class BrainScanPluginView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string { return VIEW_TYPE_PLUGIN;}

    getDisplayText(): string { return "BrainScan"; }

    async onOpen(): Promise<void> {
        const container = this.containerEl;
        container.empty();
        const iframe = container.createEl('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.src = 'http://localhost:4200'; // Replace with your desired URL
        // Add more elements to your view as needed

        
    }

    async onClose(): Promise<void> {
        // Cleanup when the view is closed, if necessary
        window.removeEventListener('message', () => {});
    }

}