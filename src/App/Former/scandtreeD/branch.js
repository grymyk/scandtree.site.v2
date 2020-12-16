import config from './config';
import board from './board';
import wrapper from './wrapper';

const BranchLib = {
	getInputValues() {
		const inputsHolder = config.getInputHolder();
		const inputs = inputsHolder.querySelectorAll('input');

		for (let i = 0, len = inputs.length; i < len; i += 1) {
			const property = inputs[i].getAttribute('data-parameter');
			const value = +inputs[i].getAttribute('value');

			config.setInputParam(property, value);
		}
	},

	setCount() {
		const longBoard = config.treeParam('branch');
		const firstBranch = config.treeParam('first');
		const branch = config.getInputParam('branch');
		const short = config.getInputParam('trunk');

		if (branch > 0 && short >= 1) {
			let count = (longBoard + short) * branch;
			count += firstBranch;

			config.setOutputParam('count', count);
		}
	},

	getTopBoard() {
		const zIndex = 0;
		const width = config.getInputParam('width');

		return BranchLib.boardElem(zIndex, width);
	},

	setSpread() {
		const spread = config.getInputParam('spread');
		const delta = BranchLib.getDelta(spread);

		config.setOutputParam('delta', delta);
	},

	getWidthBranch(index) {
		const delta = config.getOutputParam('delta');
		const fulcrum = config.getInputParam('width');

		const width = (index + 1) * delta + fulcrum;
		return parseInt(width, 10);
	},

	getDelta(spread) {
		const MAX_SPREAD = 179;

		const radian = (degree) => degree * Math.PI / 180;

		const height = config.getInputParam('height');
		const size = BranchLib.getSizeBranch();

		if (0 < spread && spread < MAX_SPREAD) {
			const phi = radian(spread);

			return (size * height) * Math.tan(phi);
		}

		return 0;
	},

	getMaxSpread(index) {
		const STEP = 5;
		const MAX_BRANCH = 10;
		const size = BranchLib.getSizeBranch();
		const height = config.getInputParam('height');
		index = MAX_BRANCH || config.getInputParam('branch');

		const limit = config.getLimit();
		const tgA = index * height * size / limit;
		const alphaRadian = Math.atan(tgA);
		const alphaDegree = Math.floor(alphaRadian * 180 / Math.PI);
		const maxSpread = 180 - 2 * alphaDegree;

		return Math.floor(maxSpread / STEP) * STEP;
	},

	setMaxSpread() {

		const spread = BranchLib.getMaxSpread();

		const spreadInput = document.querySelector(wrapper.spreadInput);
		spreadInput.setAttribute('max', spread);
	},

	getSizeBranch() {
		const short = config.getInputParam('trunk');
		const longBoard = config.treeParam('branch');

		return short + longBoard;
	},

	periodBranch(index) {
		const size = BranchLib.getSizeBranch();

		return Math.floor(Math.floor(index / size));
	},

	setMaxWidthBranch() {
		const branch = config.getInputParam('branch') - 1;
		const maxWidth = BranchLib.getWidthBranch(branch);

		config.setOutputParam('maxWidth', maxWidth);
	},

	boardElem(zIndex, width) {
		const li = document.createElement('LI');

		li.style.cssText = board.setBoardStyles(zIndex, width);
		li.innerHTML = board.getBoardTemplate(width);

		return li;
	},

	getLongBoard(index) {
		const longBoard = config.treeParam('branch');
		const size = BranchLib.getSizeBranch();

		return Math.floor(index %  size / longBoard);
	},

	createBranchElems(i, len) {
		const fulcrum = config.getInputParam('width');
		const trunk = config.getInputParam('trunk');
		const piece = config.getOutputParam('piece');
		const size = trunk + 2;

		let width = 0;
		let totalWidth = 0;

		let zIndex = -i;

		const boards = [];

		for (let j = 0; i < len; i += 1) {
			width = fulcrum;

			if (j === 0) {
				const n = BranchLib.periodBranch(i);

				width = BranchLib.getWidthBranch(n);

				const k = i % size;

				if (k === 2) {
					piece.push(width);
				}
			}

			const board = BranchLib.boardElem(zIndex, width);
			boards.push(board);

			zIndex -= 1;

			j = BranchLib.getLongBoard(i);

			totalWidth += width;
		}

		config.setOutputParam('totalWidth', totalWidth);

		return boards;
	},

	setInputHolder(elem) {
		config.setInputHolder(elem);
	},

	getScandTree() {
		const branchesHolder = document.createElement('UL');
		const holder = document.getElementById(wrapper.treeHolder);
		holder.appendChild(branchesHolder);

		const topBoard = BranchLib.getTopBoard();

		const parent = document.querySelector(wrapper.treeParent);
		parent.appendChild(topBoard);

		const branch = config.getInputParam('branch');
		const size = BranchLib.getSizeBranch('size');

		const i = 1;
		const len = branch * size + 1;

		const branches = BranchLib.createBranchElems(i, len);

		if (branches) {
			const elems = BranchLib.makeFragment(branches);

			parent.appendChild(elems);
		}
	},

	makeFragment(boards) {
		const fragment = document.createDocumentFragment();

		boards.forEach((board) => {
			fragment.appendChild(board);
		});

		return fragment;
	},

	removeLastLong() {
		const piece = config.getOutputParam('piece');

		const end = piece.length - 1;

		const newPeace = piece.slice(0, end);

		config.setOutputParam('piece', newPeace);
	}
};

export default {
	appendOneLong: BranchLib.appendOneLong,
	removeLastLong: BranchLib.removeLastLong,
	makeFragment: BranchLib.makeFragment,
	createBranchElems: BranchLib.createBranchElems,
	setSpread: BranchLib.setSpread,
	setMaxSpread: BranchLib.setMaxSpread,
	getTopBoard: BranchLib.getTopBoard,
	getSizeBranch: BranchLib.getSizeBranch,
	setCount: BranchLib.setCount,
	getInputValues: BranchLib.getInputValues,
	setInputHolder: BranchLib.setInputHolder,
	getScandTree: BranchLib.getScandTree,
	setMaxWidthBranch: BranchLib.setMaxWidthBranch,
};
