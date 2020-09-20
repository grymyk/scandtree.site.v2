const scrollToBlock = (href) => {
	const HEADER_HEIGHT = 70;

	const id = href.slice(1);
	const block = document.getElementById(id);
	const shift = block.offsetTop - HEADER_HEIGHT;
	const offsetTop = Math.ceil(shift);

	const scrollOptions = {
		left: 0,
		top: offsetTop,
		behavior: 'smooth'
	};

	window.scrollTo(scrollOptions);
};

const getSize = (elem, param) => {
	const style = window.getComputedStyle(elem);
	return style.getPropertyValue(param);
};

const getLeft = (elem) => elem.offsetLeft + 'px';

const getTop = (elem) => elem.offsetTop + 'px';

const metrix = {};

const getElemByHref = (href) => {
	const selector = '#desktop a[href="' + href + '"]';
	return document.querySelector(selector);
};

const setParam = (href, mobileWidth) => {
	const MOBILE_WIDTH = mobileWidth;

	const SIZE = '5px';
	const TOP_DESKTOP = '42px';
	const LEFT_MOBILE = '-3px';

	const item = getElemByHref(href);
	const itemParent = item.parentNode;
	const screenWidth = window.innerWidth;

	if (screenWidth < MOBILE_WIDTH) {
		metrix[href] = {
			left: LEFT_MOBILE,
			top: getTop(item),
			width: SIZE,
			height: getSize(itemParent, 'height')
		};
	} else if (screenWidth >= MOBILE_WIDTH) {
		metrix[href] = {
			left: getLeft(item),
			top: TOP_DESKTOP,
			width: getSize(itemParent, 'width'),
			height: SIZE
		};
	}

	return metrix[href];
};

const setMetrix = (params) => {
	const indicator = document.getElementById('nav-indicator');

	const { style } = indicator;
	const { left, top, width, height } = params;

	style.left = left;
	style.top = top;
	style.width = width;
	style.height = height;
};

const getMetrix = (id, mobileWidth) => {
	setParam(id, mobileWidth);

	return metrix[id];
};

const setCursor = (id, mobileWidth) => {
	const params = getMetrix(id, mobileWidth);

	setMetrix(params);
};

const toggleClick = (href) => {
	const selector = '#desktop a';
	const items = document.querySelectorAll(selector);
	const cls = 'active';

	items.forEach((item) => {
		item.classList.remove(cls);
	});

	const activeItem = getElemByHref(href);
	activeItem.classList.add(cls);
};

export {
	scrollToBlock,
	setCursor,
	toggleClick
};
