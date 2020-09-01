import Product from './product';

const sectionFormer = new Product({
    title: 'products',
    products: [{
            images: {
                src: 'small.jpg',
                title: 'small scandinavian tree'
            },
            subtitle: 'small',
            params: [{
                name: 'height:',
                size: '22sm'
            }, {
                name: 'branch:',
                size: '5 peaces.'
            }]
        }, {
            images: {
                src: 'big.jpg',
                title: 'small scandinavian tree'
            },
            subtitle: 'big',
            params: [{
                name: 'height:',
                size: '1m'
            }, {
                name: 'branch:',
                size: '17peaces.'
            }]
    }]
})

const product = document.createDocumentFragment();

product.appendChild(sectionFormer.elem);

export default product;
