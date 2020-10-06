import contactTemplate from './contact.handlebars';
import ajax from './form.js';

class Contact {
	constructor(options) {
		this.elem = document.createElement('div');
		this.elem.id = 'contacts';
		this.elem.innerHTML = contactTemplate(options);

		this.loadHandler = this.loadHandler.bind(this.elem);
		this.elem.load = this.loadHandler;
	}

	loadHandler() {
		ajax();
	}
}

export default Contact;
