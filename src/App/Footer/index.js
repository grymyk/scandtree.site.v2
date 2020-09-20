import './footer.scss';
import Footer from './footer';

const sectionFooter = new Footer({
	socioNets: [{
		href: 'https://www.facebook.com/scandtree',
		label: 'facebook'
	}, {
		href: 'https://www.instagram.com/scandtree/',
		label: 'instagram'
	}],
	year: '2020',
});

export default sectionFooter.elem;
