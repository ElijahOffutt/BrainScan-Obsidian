import { ItemView, WorkspaceLeaf } from 'obsidian';

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
        container.createEl('h1', { text: 'BrainScan Plugin View' });
        // Add more elements to your view as needed
    }

    async onClose(): Promise<void> {
        // Cleanup when the view is closed, if necessary
    }

}