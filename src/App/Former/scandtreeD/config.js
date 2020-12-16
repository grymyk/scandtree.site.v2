import wrapper from './wrapper';

const config = {
	input: {
		height: 10,
		width: 16,
		long: 1000,
		trunk: 2,
		branch: 10,
		spread: 25,
	},

	output: {
		count: null,
		delta: null,
		scaleX: 1,
		totalWidth: 0,
		piece: [],
		remainder: 0,
		numberBoard: 1,
		raw: 2
	},

	tree: {
		first: 1,
		branch: 2,
		trunk: 1
	},

	owner: 'user',
	limit: 0,
	inputHolder: null,

	setInputHolder(elem) {
		config.inputHolder = elem;
	},

	getInputHolder() {
		return config.inputHolder;
	},

	setInputParam(property, value) {
		config.input[property] = value;
	},

	treeParam(property) {
		return +config.tree[property];
	},

	getInputParam(property) {
		return +config.input[property];
	},

	getOutputParam(property) {
		return config.output[property];
	},

	setOutputParam(property, value) {
		config.output[property] = value;
	},

	getOwner() {
		return config['owner'];
	},

	setOwner(value) {
		return config['owner'] = value;
	},

	setLimit(limit) {
		config.limit = limit;
	},

	getLimit() {
		return config.limit;
	},

	showCount() {
		const count = this.output.count;

		console.log('Count: %d', count);

		document.querySelector(wrapper.output.count).html(count);
	},

	showAllWidth() {
		const width = this.output.allWidth;
		const elem = document.querySelector(wrapper.output.count);

		console.log('All Width: %s mm', width);

		if (elem) {
			elem.innerHTML = width;
		}
	},

	showRemainder() {
		const remainder = this.output.remainder;

		console.log('Remainder: %d mm', remainder);

		const inputsHolder = this.config.inputHolder;

		const selector = wrapper.output.remainder;
		inputsHolder.querySelector(selector).innerHTML = remainder;
	},

	showNumberBoard() {
		const number = this.config.board.numberBoard;

		console.log('Number Board: %s mm', number);

		const inputsHolder = this.config.inputHolder;

		const selector = wrapper.output.numberBoard;
		inputsHolder.querySelector(selector).innerHTML = number;
	},

	showPieceWidth() {
		document.querySelector(wrapper.output.pieceWidthHolder).innerHTML = '';

		const piece = this.config.output.piece;
		const inputsHolder = this.config.inputHolder;

		let list = '<ul>';

		for (let i = 0, j = 1, k = 1, len = piece.length; i < len; i += 1) {
			if (i % 3 === 0) {
				list += '<li><b>' + k + '. </b>';
				k += 1;
			}

			list += '<span>' + piece[i] + '</span> ';

			if (j % 3 === 0) {
				list += '</li>';
			}

		}

		list += '</ul>';

		const selector = wrapper.output.pieceWidthHolder;
		inputsHolder.querySelector(selector).innerHTML = list;
	},

	getInputOwner() {
		const inputHolder = this.config.inputHolder;
		config.setOwner(inputHolder.dataset.dataOwner);
	}
};

export default config;
