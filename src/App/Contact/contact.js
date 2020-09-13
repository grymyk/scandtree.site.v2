import contactTemplate from './contact.handlebars';

class Contact {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'contacts';
        // this.elem.className = 'bg_color';

        this.elem.innerHTML = contactTemplate(options);
    }
}

export default Contact;
