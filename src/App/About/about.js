import aboutTemplate from './about.handlebars';

class About {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'about';
        this.elem.className = 'fullscreen bg_img';

        this.elem.innerHTML = aboutTemplate(options);
    }
}

export default About;
