import './product.scss';
import Product from './product';
import small from './img/small.jpg';
import big from './img/big.jpg';

const sectionFormer = new Product({
	title: 'products',
	products: [{
		subtitle: 'small',
		images: {
			src: small,
			title: 'small scandinavian tree'
		},
		params: [{
			name: 'height:',
			size: '22sm'
		}, {
			name: 'branch:',
			size: '5peaces'
		}]
	}, {
		subtitle: 'big',
		images: {
			src: big,
			title: 'big scandinavian tree'
		},
		params: [{
			name: 'height:',
			size: '1m'
		}, {
			name: 'branch:',
			size: '17peaces'
		}]
	}]
});

export default sectionFormer.elem;
