import Footer from './footer';

const sectionFooter = new Footer({
    socio_nets: [{
        href: 'https://www.facebook.com/scandtree',
        label: 'facebook',
        cls: 'icon facebook'
    }, {
        href: 'https://www.instagram.com/scandtree/',
        label: 'Instagram',
        cls: 'icon instagram'
    }],
    year: '2020',
})

export default sectionFooter.elem;
