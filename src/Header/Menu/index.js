import './menu.scss'
import menuTemplate from "./menu.handlebars";

// import hamburgerClickHandler from './hamburger';

const nav = document.createElement('nav');
let navClasses = nav.classList
let isClosed = true;

class Menu {
    constructor(options) {
        this.elem = document.createElement('nav');
        this.elem.id = 'nav';
        this.elem.innerHTML = menuTemplate(options);

        this.hamburgerMenu = this.elem.querySelector('.nav-toggle');
        this.hamburgerMenu.onclick = this.hamburgerClickHandler;
    }

    hamburgerClickHandler = () => {
        this.elem.classList.toggle('open')
    }
}

export default Menu;
