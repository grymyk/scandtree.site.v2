import config from './config';
import wrapper from './wrapper';

const shower = {
	pieceWidth() {
		const piece = config.getOutputParam('piece');
		const len = piece.length;

		let list = '<h5>longs:</h5><ol>';

		for (let i = 0; i < len; i += 1) {
			list += '<li>';

			list += piece[i];

			list += '</li>';
		}

		list += '</ol>';

		const selector = wrapper.output.pieceWidth;
		document.querySelector(selector).innerHTML = list;
	},

	remainder() {
		const remainder = config.getOutputParam('remainder');

		const elem = document.querySelector(wrapper.output.remainder);

		if (elem) {
			elem.innerHTML = remainder;
		}
	},

	numberBoard() {
		const number = config.getOutputParam('numberBoard');
		const elem = document.querySelector(wrapper.output.numberBoard);

		if (elem) {
			elem.innerHTML = number;
		}
	},

	totalWidth() {
		const width = config.getOutputParam('totalWidth');
		const elem = document.querySelector(wrapper.output.totalWidth);

		if (elem) {
			elem.innerHTML = width;
		}
	},

	widthScandTree() {
		const maxWidth = config.getOutputParam('maxWidth');
		const elem = document.querySelector(wrapper.output.maxWidth);

		if (elem) {
			elem.innerHTML = maxWidth;
		}
	},

	countPiece() {
		const count = config.getOutputParam('count');
		const elem = document.querySelector(wrapper.output.count);

		if (elem) {
			elem.innerHTML = count;
		}
	},

	showCountConsole() {
		const count = config.getOutputParam('count');

		console.log('Count: %d', count);
	},

	heightScandTree() {
		const count = config.getOutputParam('count');
		const boardHeight = config.getInputParam('height');
		const stHeight = count * boardHeight;
		const elem = document.querySelector(wrapper.output.height);

		if (elem) {
			elem.innerHTML = stHeight;
		}
	}
};

export default {
	pieceWidth: shower.pieceWidth,
	remainder: shower.remainder,
	numberBoard: shower.numberBoard,
	totalWidth: shower.totalWidth,
	widthScandTree: shower.widthScandTree,
	countPiece: shower.countPiece,
	heightScandTree: shower.heightScandTree,
	showScandTree: shower.showScandTree
};

