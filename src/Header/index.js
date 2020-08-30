import './header.scss';

import Logo from './Logo';
import Menu from './Menu';

let scandtreeLogo = new Logo({
    href: '#about',
    name: 'scandinavian tree'
});

const scandtreeMenu = new Menu({
    items: [{
        href: '#about',
        name: 'about',
    },{
        href: '#gallery',
        name: 'gallery'
    },{
        href: '#former',
        name: 'former'
    },{
        href: '#products',
        name: 'products'
    },{
        href: '#contacts',
        name: 'contacts'
    }]
})

const header = document.createDocumentFragment();

header.appendChild(scandtreeLogo.elem);
header.appendChild(scandtreeMenu.elem);

export default header;
