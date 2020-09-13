import './reset.scss';
import './main.scss';

import append from './helper';

// import init from '../menu';
// console.log(init);

import Header from './App/Header';
import About from './App/About';
// import Gallery from './App/Gallery';
// import Former from './App/Former';
import Product from './App/Product';
import Contact from './App/Contact';
import Footer from './App/Footer';

// const setMetrix = (txt) => {
//     console.log('hello');
//     console.log(txt);
//     console.log('world');
// };

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

    // append(components);
    append(components, console.log);
};

document.addEventListener('DOMContentLoaded', loadHandler);
