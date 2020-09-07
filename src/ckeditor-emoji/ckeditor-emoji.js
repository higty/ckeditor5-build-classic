import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import EmojiEditing from './ckeditor-emojiediting';
import EmojiUI from './ckeditor-emojiui';

export default class Emoji extends Plugin {
	static get requires() {
		return [EmojiEditing, EmojiUI];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Emoji';
	}
}
