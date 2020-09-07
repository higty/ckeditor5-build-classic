/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module highlight/highlightediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import EmojiCommand from './ckeditor-emojicommand';

/**
 * The highlight editing feature. It introduces the {@link module:highlight/highlightcommand~HighlightCommand command} and the `highlight`
 * attribute in the {@link module:engine/model/model~Model model} which renders in the {@link module:engine/view/view view}
 * as a `<mark>` element with a `class` attribute (`<mark class="marker-green">...</mark>`) depending
 * on the {@link module:highlight/highlight~HighlightConfig configuration}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class HighlightEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'EmojiEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor(editor) {
		super(editor);

		editor.config.define('emoji', {
			images: [
				{
					url: 'https://www.yourdomain.com/icon/emoji.png'
				}
			]
		});
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		editor.model.schema.extend('$text', { allowAttributes: 'emoji' });
		editor.commands.add('emoji', new EmojiCommand(editor));
	}
}

