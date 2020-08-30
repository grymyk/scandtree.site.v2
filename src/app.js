import './css/main.scss'
// import './css/scandtree.scss'
// import './css/basictree.scss'

import append from './helper'

import Header from './Header'

const containerHeader = document.getElementById('header');

append({
    parent: containerHeader,
    child: Header
});
