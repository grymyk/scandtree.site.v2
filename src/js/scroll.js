import { setCursor, toggleClick } from '../cursor';

const getBlocks = (names) => {
	const sizes = {};
	const maxes = [-1];

	const windowHeight = window.innerHeight;
	const shift = windowHeight / 2;

	names.forEach((name) => {
		const block = document.getElementById(name);

		if (block) {
			const MARGIN_TOP = 70;
			const offsetY = block.offsetTop;
			const height = block.offsetHeight;

			const max = +(height + offsetY + MARGIN_TOP - shift).toFixed(0);

			maxes.push(max);
		}
	});

	for (let i = 0, len = maxes.length - 1; i < len; i += 1) {
		const name = names[i];

		sizes[name] = {
			min: maxes[i] + 1,
			max: maxes[i + 1]
		};
	}

	return sizes;
};

const getMin = (blocks, name) => blocks[name]['min'];
const getMax = (blocks, name) => blocks[name]['max'];

function setCurrentItem(windowScrollY, options) {
	const { blockNames, mobileWidth } = options;

	const blocks = getBlocks(blockNames);

	for (const name in blocks) {
		const min = getMin(blocks, name);
		const max = getMax(blocks, name);

		if (windowScrollY >= min && windowScrollY < max) {
			const idBlock = '#' + name;

			toggleClick(idBlock);
			setCursor(idBlock, mobileWidth);
		}
	}
}

const mobileWidth = 1024;

const blockNames = [
	'about',
	'products',
	'contacts'
];

let windowScrollY = 0;
let ticking = false;

const options = {
	blockNames,
	mobileWidth
};

const scrollHandler = () => {
	windowScrollY = window.scrollY;

	if (!ticking) {
		window.requestAnimationFrame(() => {
			setCurrentItem(windowScrollY, options);
			ticking = false;
		});

		ticking = true;
	}
};

window.addEventListener('scroll', scrollHandler);
