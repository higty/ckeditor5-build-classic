import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ImageButtonView from '../ckeditor-emoji/ckeditor-imagebuttonview';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import smileIcon from './theme/icons/1F604.svg';

import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';



export default class EmojiUI extends Plugin {

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'EmojiUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const images = this.editor.config.get('emoji.images');

		for (const image of images) {
			this._addButton('emoji:' + image.url, image.url);
		}

		this._addDropdown(images);
	}
	_addButton(name, url) {
		const editor = this.editor;

		editor.ui.componentFactory.add(name, locale => {
			const buttonView = new ImageButtonView();

			buttonView.set({
				url,
				tooltip: true
			});

			buttonView.on('execute', () => {
				editor.execute('emoji', { url });
				editor.editing.view.focus();
			});
			return buttonView;
		});
	}

	_addDropdown(images) {
		const editor = this.editor;
		const t = editor.t;
		const componentFactory = editor.ui.componentFactory;

		componentFactory.add('emoji', locale => {
			const command = editor.commands.get('emoji');
			const dropdownView = createDropdown(locale, SplitButtonView);
			const splitButtonView = dropdownView.buttonView;

			splitButtonView.set({
				tooltip: t('Emoji'),
				isToggleable: true
			});
			splitButtonView.bind('icon').to(command, 'value', value => smileIcon);
			splitButtonView.delegate('execute').to(dropdownView);

			const buttons = images.map(image => {
				const buttonView = componentFactory.create('emoji:' + image.url);
				return buttonView;
			});
			dropdownView.bind('isEnabled').toMany(buttons, 'isEnabled', (...areEnabled) => areEnabled.some(isEnabled => isEnabled));

			addToolbarToDropdown(dropdownView, buttons);

			dropdownView.toolbarView.ariaLabel = t('Text emoji toolbar');

			splitButtonView.delegate('execute').to(splitButtonView, 'open');

			return dropdownView;
		});
	}


}
