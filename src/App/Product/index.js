import './product.scss';
import Product from './product';

const sectionFormer = new Product({
    title: 'products',
    products: [{
        subtitle: 'small',
        images: {
            src: 'small.jpg',
            title: 'small scandinavian tree'
        },
        params: [{
            name: 'height:',
            size: '22sm'
        }, {
            name: 'branch:',
            size: '5 peaces.'
        }]
    }, {
        subtitle: 'big',
        images: {
            src: 'big.jpg',
            title: 'big scandinavian tree'
        },
        params: [{
            name: 'height:',
            size: '1m'
        }, {
            name: 'branch:',
            size: '17peaces.'
        }]
    }]
});

export default sectionFormer.elem;
