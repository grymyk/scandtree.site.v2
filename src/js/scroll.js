import { setCursor, toggleClick } from '../cursor';

const getBlocks = (names) => {
	const sizes = [];
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

		const blockParam = {
			name,
			min: maxes[i] + 1,
			max: maxes[i + 1]
		};

		sizes.push(blockParam);
	}

	return sizes;
};

let offsetY = 0;

const interval = (params) => (
	params.min <= offsetY && offsetY <= params.max
);

function setCurrentItem(windowScrollY, options) {
	const { menuItems, mobileWidth } = options;

	offsetY = windowScrollY;

	const blocks = getBlocks(menuItems);
	// console.log(blocks);

	const currentBlock = blocks.filter(interval);
	// console.log(currentBlock);
	// console.log(currentBlock.length);

	const currentBlockName = currentBlock[0]['name'];
	const idBlock = '#' + currentBlockName;

	toggleClick(idBlock);
	setCursor(idBlock, mobileWidth);
}

const setScroll = (options) => {
	let windowScrollY = 0;
	let ticking = false;

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
};

export default setScroll;
