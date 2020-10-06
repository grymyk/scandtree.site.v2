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
	if (href) {
		const SIZE = '5px';
		const TOP_DESKTOP = '42px';
		const LEFT_MOBILE = '-3px';
		const MOBILE_WIDTH = mobileWidth;

		const item = getElemByHref(href);

		if (item) {
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
		}
	}
};

const setMetrix = (params) => {
	const indicator = document.getElementById('nav-indicator');

	if (indicator) {
		const { style } = indicator;
		const { left, top, width, height } = params;

		style.left = left;
		style.top = top;
		style.width = width;
		style.height = height;
	}
};

const getMetrix = (id, mobileWidth) => {
	setParam(id, mobileWidth);

	// console.log(metrix[id]);
	return metrix[id];
};

const toggleClick = (href) => {
	const selector = '#desktop a';
	const items = document.querySelectorAll(selector);
	const cls = 'active';

	items.forEach((item) => {
		item.classList.remove(cls);
	});

	const activeItem = getElemByHref(href);

	if (activeItem) {
		activeItem.classList.add(cls);
	}
};

const setCursor = (id, mobileWidth) => {
	const params = getMetrix(id, mobileWidth);

	setMetrix(params);
};

export {
	setCursor,
	toggleClick
};
