import {
	Editor,
	MarkdownView,
	MarkdownFileInfo,
	Modal,
	Notice,
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	MyPluginSettings,
	SampleSettingTab,
} from './settings';

import { BrainScanPluginView } from './core/PluginView';

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	settings!: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		new Notice('BrainScan Initialized');


		// Define Button Confguration Types & Inteffaces
		interface MouseEventHandler { (_evt: MouseEvent): void;}
		type RibbonButtonConfig = [
			string, // Icon name from https://lucide.dev/icons 
			string, // Tooltip text
			MouseEventHandler // Callback function to be invoked on click
		];

		// Configure ribbon icon & Button array
		let ribbonButtonConfig: RibbonButtonConfig = [
			'brain', // Icon name from https://lucide.dev/icons
			'Brain Scan', // Tooltip text
			async (_evt: MouseEvent) => { // Callback function to be invoked on click
		
				// Grab an empty tab slot in the left sidebar
				// false = reuse existing slot, don't force a new split
				const leaf = this.app.workspace.getLeftLeaf(false);

				// Load our registered 'plugin-view' into that slot and make it the focused tab
				// active: true = this tab gets focused automatically
				await leaf!.setViewState({ type: 'plugin-view', active: true });

				// If the left sidebar is collapsed, this opens it and brings our tab into view
				this.app.workspace.revealLeaf(leaf!);

			}
		];

		// This creates an icon in the left ribbon for BrainScan using a Brain Icon.
		this.addRibbonIcon(...ribbonButtonConfig);

		// This adds a view to the right sidebar.
		this.registerView(
			'plugin-view',
			(leaf) => new BrainScanPluginView(leaf),
		);

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status bar text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-modal-simple',
			name: 'Open modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'replace-selected',
			name: 'Replace selected content',
			editorCallback: (
				editor: Editor,
				_ctx: MarkdownView | MarkdownFileInfo,
			) => {
				editor.replaceSelection('Sample editor command');
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-modal-complex',
			name: 'Open modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
				return false;
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(activeDocument, 'click', (_evt: MouseEvent) => {
			// new Notice('Click');
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000),
		);
	}

	onunload() {
		new Notice('Unloading plugin');
	}


	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
