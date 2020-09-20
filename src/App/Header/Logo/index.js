import './logo.scss';
import logoTemplate from './logo.handlebars';

class Logo {
	constructor(options) {
		this.elem = document.createElement('h1');
		this.elem.className = 'logo';
		this.elem.innerHTML = logoTemplate(options);
		this.elem.onclick = this.clickHandler;
	}

	clickHandler() {
		const selector = '#desktop a[href="#about"]';
		const aboutItem = document.querySelector(selector);

		aboutItem.click();
	}
}

export default Logo;
