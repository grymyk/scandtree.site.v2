import galleryTemplate from './gallery.handlebars'

class About {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'gallery';
        this.elem.className = 'main style3 primary';
        this.elem.innerHTML = galleryTemplate(options);
    }
}

export default About
