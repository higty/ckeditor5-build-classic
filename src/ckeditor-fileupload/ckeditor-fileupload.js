import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import browsefileIcon from '@ckeditor/ckeditor5-ckfinder/theme/icons/browse-files.svg';

export default class FileUploadUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add('fileUpload', locale => {
			const view = new FileDialogButtonView(locale);

			view.set({
				acceptedType: "*",
				allowMultipleFiles: false
			});

			view.buttonView.set({
				label: t('Upload file'),
				icon: browsefileIcon,
				tooltip: true
			});

			view.on('done', this.done.bind(this));

			return view;
		});
	}
	done(evt, files) {
		if (window["CKEditor_FileUploadUI_Done"] != null) {
			var f = window["CKEditor_FileUploadUI_Done"];
			f(evt, files);
			return;
		}
		const editor = this.editor;
		const t = editor.t;
		const fileRepository = editor.plugins.get(FileRepository);

		if (files.length) {
			const file = files[0];
			const loader = fileRepository.createLoader(file);

			// Do not throw when upload adapter is not set. FileRepository will log an error anyway.
			if (!loader) {
				return;
			}
			loader.upload().then(data => {
				var url = loader.uploadResponse.default;
				const content = "<a class=\"file-link-panel\" href=\"" + url + "\" target=\"_blank\">" + file.name + "</a>";
				const viewFragment = editor.data.processor.toView(content);
				const modelFragment = editor.data.toModel(viewFragment);

				editor.model.insertContent(modelFragment);
			}).catch(reason => {
				const content = "<p>" + reason + "</p>";
				const viewFragment = editor.data.processor.toView(content);
				const modelFragment = editor.data.toModel(viewFragment);
				editor.model.insertContent(modelFragment);
			});
		}
	}
}
