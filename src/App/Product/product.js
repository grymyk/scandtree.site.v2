import productTemplate from './product.handlebars'

class Product {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.className = '';
        this.elem.innerHTML = productTemplate(options);
    }
}

export default Product
