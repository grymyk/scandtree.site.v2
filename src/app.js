import './reset.scss';
import './main.scss';

import app from './helper';
// console.log(app);

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
		// Gallery,
		// Former,
		Product,
		Contact,
		Footer
	];

	app.append(components);
};

document.addEventListener('DOMContentLoaded', loadHandler);
