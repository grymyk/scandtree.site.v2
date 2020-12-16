import config from './scandtreeD/config';
import wrapper from './scandtreeD/wrapper';
import shower from './scandtreeD/shower';
import BranchLib from './scandtreeD/branch';
import board from './scandtreeD/board';

const threeD = (inputsHolder) => {
	function setMaxWidthLimit() {
		const HORIZONT_PAD = 50;

		const limit = Math.floor((getWidthHolder() - HORIZONT_PAD) / 2);
		config.setLimit(limit);
	}

	function getWidthHolder() {
		return document.getElementById(wrapper.treeHolder).style.width;
	}

	function setMaxCount(width) {
		const delta = config.getOutputParam('delta');
		const fulcrum = config.getInputParam('width');

		const count = parseInt((width - fulcrum) / (2 * delta) + 3, 10);

		config.setOutputParam('count', count);
	}

	function appendBranch() {
		const parent = document.querySelector(wrapper.treeParent);
		const count = config.getOutputParam('count');
		const size = BranchLib.getSizeBranch();

		const len = count + size;

		const newBranches = BranchLib.createBranchElems(count, len);

		if (newBranches) {
			const fragment = BranchLib.makeFragment(newBranches);

			if (parent) {
				parent.appendChild(fragment);
			} else {
				console.log('No Parent!');
			}
		}
	}

	function deleteBranch(diff) {
		const parent = document.querySelector(wrapper.treeParent);

		if (parent) {
			const branches = parent.getElementsByTagName('LI');
			const size = BranchLib.getSizeBranch();

			const begin = branches.length - 1;
			const finish = begin - diff * size;

			for (let i = begin; i > finish; i -= 1) {
				if (branches[i]) {
					parent.removeChild(branches[i]);
				}
			}
		}
	}

	function deleteScandTree() {
		const tree = document.querySelector(wrapper.treeParent);
		const holder = tree.parentNode;

		if (holder) {
			holder.removeChild(tree);
		}

		config.setOutputParam('piece', []);
	}

	function setLongs(board) {
		const width = board.style.getPropertyValue('width');
		return +width.slice(0, -2);
	}

	function makeTransform() {
		const scaleX = config.getOutputParam('scaleX');
		const size = BranchLib.getSizeBranch();
		const holder = document.getElementById('tree_holder');
		const parent = holder.firstChild;

		const piece = [];

		if (parent) {
			const boards = parent.getElementsByTagName('LI');
			const value = 'scaleX(' + scaleX + ')';
			const len = boards.length;

			for (let i = 1; i < len; i += size) {
				boards[i].style.setProperty('transform', value, '');
				boards[i + 1].style.setProperty('transform', value, '');

				const width = Math.ceil(setLongs(boards[i]) * scaleX);
				piece.push(width);
			}
		}

		config.setOutputParam('piece', piece);
	}

	function getDeformation(newSpread) {
		const RADIAN = Math.PI / 360;
		const oldSpread = config.getInputParam('spread');

		const alpha = oldSpread * RADIAN;
		const beta = newSpread * RADIAN;

		const koef = Math.tan(beta) / Math.tan(alpha);
		config.setOutputParam('scaleX', koef);
	}

	function scaleX(spread) {
		getDeformation(spread);
		makeTransform();
	}

	function updateScandTree(spread) {
		scaleX(spread);
	}

	function handlerInput(options) {
		const strategies = {
			height: (parameter, value) => {
				deleteScandTree();

				config.setInputParam(parameter, value);

				BranchLib.getScandTree();
			},

			width: (parameter, value) => {
				deleteScandTree();

				config.setInputParam(parameter, value);

				BranchLib.getScandTree();
				BranchLib.setMaxWidthBranch();
			},

			long: (parameter, value) => {
				config.setInputParam(parameter, value);

				board.setNumberBoard();
				board.setRemainder();
			},

			trunk: (parameter, value) => {
				deleteScandTree();

				config.setInputParam(parameter, value);

				BranchLib.setSpread();
				BranchLib.setCount();

				BranchLib.getScandTree();
				makeTransform();
			},

			branch: (parameter, value) => {
				BranchLib.setCount();

				const currentBranch = config.getInputParam(parameter);

				let diff = value - currentBranch;

				if (diff > 0) {
					appendBranch();
					makeTransform();
				} else if (diff < 0) {
					diff = Math.abs(diff);

					deleteBranch(diff);
					BranchLib.removeLastLong();
				}

				config.setInputParam(parameter, value);
			},

			spread: (parameter, value) => {
				BranchLib.setCount();
				updateScandTree(value);
			},

			board: (parameter, value) => {
				config.setInputParam(parameter, value);
			},


			/*width: (width, value) => {
				setMaxCount(value);
			},*/

			typeTree: (parameter, value) => {
				if (parameter === 'branch') {
					BranchLib.setCount();

					const current = config.getInputParam(parameter);
					let diff = value - current;

					if (diff > 0) {
						appendBranch();
						makeTransform();
					} else if (diff < 0) {
						diff = Math.abs(diff);

						deleteBranch(diff);
					}

					config.setInputParam(parameter, value);

				} else if (parameter === 'spread') {
					BranchLib.setCount();

					updateScandTree(value);
				} else if (parameter === 'trunk') {
					deleteScandTree();

					config.setInputParam(parameter, value);

					BranchLib.setSpread();
					BranchLib.setCount();

					BranchLib.getScandTree();
					makeTransform();
				}
			}
		};

		const { parameter, value } = options;

		const strategy = strategies[parameter];

		strategy(parameter, value);

		showOutput();
	}

	function showOutput() {
		shower.countPiece();
		shower.heightScandTree();
		shower.widthScandTree();
		shower.numberBoard();
		shower.remainder();
		shower.totalWidth();
		// shower.pieceWidth();
	}

	const resetParams = () => {
		deleteScandTree();

		BranchLib.getInputValues();
		BranchLib.setSpread();
		BranchLib.setCount();

		BranchLib.getScandTree();

		showOutput();
	};

	function init(input) {
		BranchLib.setInputHolder(input);
		BranchLib.getInputValues();
		BranchLib.setSpread();
		// BranchLib.setMaxSpread();
		BranchLib.setCount();
		BranchLib.setMaxWidthBranch();

		board.setNumberBoard();
		board.setRemainder();

		BranchLib.getScandTree();

		showOutput();
	}

	init(inputsHolder);

	return {
		resetParams,
		handlerInput
	};
};

export default threeD;

/*function getMaxTrunk() {
		const size = getSizeBranch();
		const height = config.getInputParam('height');
		const branch = config.getInputParam('branch');
		const limit = config.getLimit();
	}*/

/*function getMaxBranch() {
	const size = getSizeBranch();
	const height = config.getInputParam('height');
	const limit = config.getLimit();
	const inputsHolder = config.getInputHolder();
	const spreadInput = inputsHolder.querySelector(wrapper.spreadInput);

	const maxSpread = +spreadInput.getAttribute('max');
	const alphaRadian = maxSpread * Math.PI / 180;

	return Math.ceil(limit / Math.tan(alphaRadian / 2) / size / height);
}*/

/*function setMaxBranch() {
	const branch = getMaxBranch();
	const inputsHolder = config.getInputHolder();

	const branchInput = inputsHolder.querySelector(wrapper.branchInput);
	branchInput.setAttribute('max', branch);
}*/
