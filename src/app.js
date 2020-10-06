import './css/reset.scss';
import './css/main.scss';

import app from './js/helper.js';
import setScroll from './js/scroll.js';

import Header from './App/Header';
import About from './App/About';
// import Gallery from './App/Gallery';
import Former from './App/Former';
import Product from './App/Product';
import Contact from './App/Contact';
import Footer from './App/Footer';

// set direct to Menu Component
const mobileWidth = 1024;

const menuItems = [
	'about',
	'former',
	'products',
	'contacts'
];
// __^__^__

const options = {
	menuItems,
	mobileWidth
};

setScroll(options);

// Header(options);

const loadHandler = () => {
	const components = [
		Header,
		About,
		Former,
		Product,
		Contact,
		Footer
	];

	app.prepend(components);
};

document.addEventListener('DOMContentLoaded', loadHandler);
