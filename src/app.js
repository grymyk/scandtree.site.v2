import './css/reset.scss';
import './css/main.scss';

import app from './js/helper.js';
import './js/scroll.js';

import Header from './App/Header';
import About from './App/About';
// import Gallery from './App/Gallery';
// import Former from './App/Former';
import Product from './App/Product';
import Contact from './App/Contact';
import Footer from './App/Footer';

const loadHandler = () => {
	const components = [
		Header,
		About,
		Product,
		Contact,
		Footer
	];

	app.prepend(components);
};

document.addEventListener('DOMContentLoaded', loadHandler);
