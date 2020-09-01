import './header.scss';

import Header from './header';
import Logo from './Logo';
import Menu from './Menu';

let scandtreeLogo = new Logo({
    href: '#about',
    name: 'scandinavian tree'
});

const scandtreeMenu = new Menu({
    items: [{
        name: 'about',
    },{
        name: 'gallery'
    },{
        name: 'former'
    },{
        name: 'products'
    },{
        name: 'contacts'
    }]
})

const header = new Header().elem;

header.append(scandtreeLogo.elem);
header.appendChild(scandtreeMenu.elem);

export default header;
