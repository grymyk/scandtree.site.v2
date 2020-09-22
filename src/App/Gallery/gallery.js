import './gallery.scss';
import galleryTemplate from './gallery.handlebars';

class About {
	constructor(options) {
		this.elem = document.createElement('div');
		this.elem.id = 'gallery';
		// this.elem.className = 'main';
		this.elem.innerHTML = galleryTemplate(options);
		// this.elem.load = () => console.log(this.elem.id);
	}
}

export default About;
