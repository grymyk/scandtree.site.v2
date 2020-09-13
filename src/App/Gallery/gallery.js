import './gallery.scss';
import galleryTemplate from './gallery.handlebars';

class About {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'gallery';
        // this.elem.className = 'main';
        this.elem.innerHTML = galleryTemplate(options);
    }
}

export default About;
