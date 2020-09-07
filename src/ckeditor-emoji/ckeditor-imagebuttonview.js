import View from '@ckeditor/ckeditor5-ui/src/view';

import '../ckeditor-emoji/theme/emoji.css';

export default class ImageButtonView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bindTemplate;

		this.set('url');

		this.set('isEnabled', true);
		this.set('isOn', false);
		this.set('isVisible', true);
		this.set('isToggleable', false);
		this.set('keystroke');
		this.set('tabindex', -1);
		this.set('tooltip');
		this.set('tooltipPosition', 's');
		this.set('type', 'button');
		this.set('withText', false);
		this.set('withKeystroke', false);

		this.children = this.createCollection();

		this.imageView = this._createImageView();

		this.setTemplate({
			tag: 'button',
			attributes: {
				class: [
					'ck',
					'ck-image-button'
				]
			},
			children: this.children,

			on: {
				mousedown: bind.to(evt => {
					evt.preventDefault();
				}),

				click: bind.to(evt => {
					// We can't make the button disabled using the disabled attribute, because it won't be focusable.
					// Though, shouldn't this condition be moved to the button controller?
					if (this.isEnabled) {
						this.fire('execute');
					} else {
						// Prevent the default when button is disabled, to block e.g.
						// automatic form submitting. See ckeditor/ckeditor5-link#74.
						evt.preventDefault();
					}
				})
			}
		});
	}
	render() {
		super.render();

		this.children.add(this.imageView);
	}
	_createImageView() {
		const imageView = new View();
		const bind = this.bindTemplate;

		imageView.setTemplate({
			tag: 'img',
			attributes: {
				class: [
					'ck',
					'ck-button__image-button-icon'
				],
				src: bind.to('url')
			}
		});
		return imageView;
	}
}
