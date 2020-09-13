import footerTemplate from './footer.handlebars';

class Footer {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'footer';

        this.elem.innerHTML = footerTemplate(options);
    }
}

export default Footer;
