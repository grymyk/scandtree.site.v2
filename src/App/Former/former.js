import formerTemplate from './former.handlebars';

class Former {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.id = 'constructor';
        this.elem.className = 'main style3 secondary';
        this.elem.innerHTML = formerTemplate(options);
    }
}

export default Former;
