import './menu.scss';
import menuTemplate from './menu.handlebars';

// import './scroll';
import './menu';

const scrollToBlock = (target) => {
    const HEADER_HEIGHT = 70;

    const idBlock = target.getAttribute('href').slice(1);
    const block = document.getElementById(idBlock);
    const shift = block.offsetTop - HEADER_HEIGHT;
    const offsetTop = Math.ceil(shift);

    const scrollOptions = {
        left: 0,
        top: offsetTop,
        behavior: 'smooth'
    };

    window.scrollTo(scrollOptions);
};

const getMetrix = (elem) => {
    const parent = elem.parentNode;
    const style = window.getComputedStyle(parent);

    const width = style.getPropertyValue('width');
    const left = parent.offsetLeft;

    console.log(width, left);

    return { width, left };
};

const setMetrix = (width, left) => {
    const indicator = document.getElementById('nav-indicator');

    indicator.style.width = width;
    indicator.style.left = left + 'px';
};

const setCursor = (active) => {
    console.log('setCursor');

    const { width, left } = getMetrix(active);

    setMetrix(width, left);
};

class Menu {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'nav';
        this.elem.innerHTML = menuTemplate(options);

        this.hamburger = this.elem.querySelector('#hamburger');
        this.hamburger.addEventListener('click', this.hamburgerClickHandler);

        this.desktopMenu = this.elem.querySelector('#desktop ul');
        this.desktopMenu.addEventListener('click', this.clickHandler);
        this.desktopMenu.addEventListener('load', this.loadHandler);
    }

    loadHandler() {
        console.log('load menu');
    }

    hamburgerClickHandler(event) {
        console.log('hamburder click');

        event.preventDefault();

        const nav = document.getElementById('nav');

        nav.classList.toggle('open');
    }

    clickHandler(event) {
        event.preventDefault();

        const active = event.target;

        scrollToBlock(active);
        setCursor(active);
    }
}

export default Menu;
