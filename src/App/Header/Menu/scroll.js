import { setCursor, toggleClick } from './cursor';

const blockNames = ['about', 'products', 'contacts'];

const getBlocks = (names) => {
	const sizes = {};
	const maxes = [-1];

	const windowHeight = window.innerHeight;
	const shift = windowHeight / 2;
	// console.log(shift);

	names.forEach((name) => {
		// console.log(name);

		const block = document.getElementById(name);
		// console.log(block);

		const offsetY = block.offsetTop;
		// console.log(offsetY);

		// const height = getHeight(block);
		const height = block.offsetHeight;
		// console.log(height);

		const MARGIN_TOP = 70;

		const max = +(height + offsetY + MARGIN_TOP - shift).toFixed(0);

		maxes.push(max);
	});

	// console.log(maxes);

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

let windowScrollY = 0;
let ticking = false;

const mobileWidth = 1024;

function doSomething(scrollY) {
	const blocks = getBlocks(blockNames);
	// console.log(blocks);

	for (const name in blocks) {
		const min = getMin(blocks, name);
		const max = getMax(blocks, name);

		if (scrollY >= min && scrollY < max) {
			const idBlock = '#' + name;
			toggleClick(idBlock);
			setCursor(idBlock, mobileWidth);
		}
	}
}

const scrollHandler = () => {
	windowScrollY = window.scrollY;

	if (!ticking) {
		window.requestAnimationFrame(() => {
			doSomething(windowScrollY);
			ticking = false;
		});

		ticking = true;
	}
};

window.addEventListener('scroll', scrollHandler);
