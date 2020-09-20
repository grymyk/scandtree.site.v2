import './header.scss';

import Header from './header';
import Logo from './Logo';
import Menu from './Menu';

const scandtreeLogo = new Logo({
	href: '#about',
	name: 'scandinavian tree'
});

const scandtreeMenu = new Menu({
	modileWidth: 1024,
	items: [{
		name: 'about',
		cls: 'active'
	},
	// {
	//     name: 'gallery'
	// },{
	//     name: 'former'
	// }
	{
		name: 'products',
		cls: ''
	}, {
		name: 'contacts',
		cls: ''
	}]
});

const header = new Header().elem;

header.append(scandtreeLogo.elem);
header.append(scandtreeMenu.elem);

export default header;
