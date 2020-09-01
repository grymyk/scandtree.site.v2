import aboutTemplate from './about.handlebars'

class About {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'about';
        this.elem.className = 'main style1 dark fullscreen home';

        this.elem.innerHTML = aboutTemplate(options);
    }
}

export default About
