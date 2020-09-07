import Command from '@ckeditor/ckeditor5-core/src/command';

export default class EmojiCommand extends Command {
	execute(parameter = {}) {
		const editor = this.editor;
		const model = this.editor.model;
		const document = model.document;

		const url = parameter.url;
		if (url == null) { return; }

		const content = "<img src=\"" + url + "\" />";
		const viewFragment = editor.data.processor.toView(content);
		const modelFragment = editor.data.toModel(viewFragment);

		editor.model.insertContent(modelFragment);

	}
}
