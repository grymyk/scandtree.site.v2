import './menu.scss';
import menuTemplate from './menu.handlebars';
import { setCursor, toggleClick }  from '../../../cursor.js';

const scrollToBlock = (href) => {
	const HEADER_HEIGHT = 70;

	const id = href.slice(1);
	const block = document.getElementById(id);
	const shift = block.offsetTop - HEADER_HEIGHT;
	const offsetTop = Math.ceil(shift);

	const scrollOptions = {
		left: 0,
		top: offsetTop,
		behavior: 'smooth'
	};

	window.scrollTo(scrollOptions);
};

class Menu {
	constructor(options) {
		const { modileWidth } = options;
		const { items } = options;

		this.elem = document.createElement('div');
		this.elem.id = 'nav';
		this.elem.mobileWidth = modileWidth;
		this.elem.innerHTML = menuTemplate({ items });

		this.hamburgerClickHandler = this.hamburgerClickHandler.bind(this.elem);

		this.hamburger = this.elem.querySelector('#hamburger');
		this.hamburger.addEventListener('click', this.hamburgerClickHandler);

		this.clickHandler = this.clickHandler.bind(this.elem);

		this.desktopMenu = this.elem.querySelector('#desktop ul');
		this.desktopMenu.addEventListener('click', this.clickHandler);

		this.resizeHandler = this.resizeHandler.bind(this.elem);

		window.addEventListener('resize', this.resizeHandler);
	}

	hamburgerClickHandler(event) {
		event.preventDefault();

		this.classList.toggle('open');
	}

	clickHandler(event) {
		event.preventDefault();

		const idBlock = event.target.getAttribute('href');

		scrollToBlock(idBlock);
		toggleClick(idBlock);
		setCursor(idBlock, this.mobileWidth);
	}

	resizeHandler() {
		const active = document.querySelector('#desktop .active');

		if (active) {
			const idBlock = active.getAttribute('href');

			setCursor(idBlock, this.mobileWidth);
		}
	}
}

export default Menu;
