import './about.scss';
import About from './about';

const sectionAbout = new About({
    hello: 'Hello',
    motto: 'Natural and functional style of Nordic countries can' +
        'decorate your home or be an elegant gift. All trees are' +
        'handmade in Ukraine from environmental-friendly wood.',
    next: {
        href: '#one',
        text: 'More'
    }
});

export default sectionAbout.elem;
