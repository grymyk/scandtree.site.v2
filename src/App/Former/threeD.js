import config from './scandtreeD/config';
import wrapper from './scandtreeD/wrapper';
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

	function boardElem(zIndex, width) {
		const li = document.createElement('LI');

		li.style.cssText = board.setBoardStyles(zIndex, width);
		li.innerHTML = board.getBoardTemplate(width);

		return li;
	}

	function getSizeBranch() {
		const short = config.getInputParam('trunk');
		const longBoard = config.treeParam('branch');

		return short + longBoard;
	}

	function periodBranch(index) {
		const size = getSizeBranch();

		return Math.floor(Math.floor(index / size));
	}

	function getLongBoard(index) {
		const longBoard = config.treeParam('branch');
		const size = getSizeBranch();

		return Math.floor(index %  size / longBoard);
	}

	function getWidthBranch(index) {
		const HALF_WIDTH = 2;
		const fulcrum = config.getInputParam('width');
		const delta = config.getOutputParam('delta');

		return HALF_WIDTH * index * delta + fulcrum;
	}

	function getMaxSpread(branch) {
		const STEP = 5;
		const MAX_BRANCH = 10;
		const size = getSizeBranch();
		const height = config.getInputParam('height');
		branch = MAX_BRANCH || config.getInputParam('branch');

		const limit = config.getLimit();
		const tgA = branch * height * size / limit;
		const alphaRadian = Math.atan(tgA);
		const alphaDegree = Math.floor(alphaRadian * 180 / Math.PI);
		const maxSpread = 180 - 2 * alphaDegree;

		return Math.floor(maxSpread / STEP) * STEP;
	}

	function setMaxSpread() {
		const spread = getMaxSpread();

		const spreadInput = document.querySelector(wrapper.spreadInput);
		spreadInput.setAttribute('max', spread);
	}

	function createBranchElems(i, len) {
		const fulcrum = config.getInputParam('width');

		let width = 0;

		let zIndex = -i;

		const boards = [];

		for (let j = 0; i < len; i += 1) {
			width = fulcrum;

			if (j === 0)  {
				const n = periodBranch(i);

				width = getWidthBranch(n) + fulcrum;
			}

			boards.push(boardElem(zIndex, width));

			zIndex -= 1;

			j = getLongBoard(i);
		}

		return boards;
	}

	function getDelta(spread) {
		const MAX_SPREAD = 179;

		const height = config.getInputParam('height');
		const size = getSizeBranch();

		if (0 < spread && spread < MAX_SPREAD) {
			const radian = (90 - spread / 2) * Math.PI / 180;

			return size * height / Math.tan(radian);
		}

		return 0;
	}

	function setSpread() {
		const spread = config.getInputParam('spread');

		const delta = getDelta(spread);

		config.setOutputParam('delta', delta);
	}

	function setCount() {
		const longBoard = config.treeParam('branch');
		const lastBranch = config.treeParam('last');

		const branch = config.getInputParam('branch');

		const short = config.getInputParam('trunk');

		if (branch > 0 && short >= 1) {
			let count = (longBoard + short) * branch;
			count += lastBranch;

			config.setOutputParam('count', count);
		}
	}

	function getTopBoard() {
		const zIndex = 0;
		const width = config.getInputParam('width');

		return boardElem(zIndex, width);
	}

	function showScandTree() {
		const branchesHolder = document.createElement('UL');
		const holder = document.getElementById(wrapper.treeHolder);
		holder.appendChild(branchesHolder);

		const topBoard = getTopBoard();

		const parent = document.querySelector(wrapper.treeParent);
		parent.appendChild(topBoard);

		const branch = config.getInputParam('branch');
		const size = getSizeBranch('size');

		const i = 1;
		const len = branch * size + 1;

		const branches = createBranchElems(i, len);

		if (branches) {
			const elems = makeFragment(branches);

			parent.appendChild(elems);
		}
	}

	function setMaxCount(width) {
		const delta = config.getOutputParam('delta');
		const fulcrum = config.getInputParam('width');

		const count = parseInt((width - fulcrum) / (2 * delta) + 3, 10);

		config.setOutputParam('count', count);
	}

	function makeFragment(boards) {
		const fragment = document.createDocumentFragment();

		boards.forEach((board) => {
			fragment.appendChild(board);
		});

		return fragment;
	}

	function appendBranch() {
		const parent = document.querySelector(wrapper.treeParent);

		const count = config.getOutputParam('count');
		const size = getSizeBranch();

		const i = count + 1;
		const len = count + size + 1;

		const newBranches = createBranchElems(i, len);

		if (newBranches) {
			const fragment = makeFragment(newBranches);

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
			const size = getSizeBranch();

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
	}

	function makeTransform() {
		const scaleX = config.getOutputParam('scaleX');
		const size = getSizeBranch();
		const holder = document.getElementById('tree_holder');
		const parent = holder.firstChild;

		if (parent) {
			const boards = parent.getElementsByTagName('LI');
			const value = 'scaleX(' + scaleX + ')';

			for (let i = 1, len = boards.length; i < len;) {
				boards[i].style.setProperty('transform', value, '');
				boards[i + 1].style.setProperty('transform', value, '');

				i += size;
			}
		}
	}

	function getDeformation(newSpread) {
		const RADIAN = Math.PI / 360;
		const oldSpread = config.getInputParam('spread');

		const alpha = oldSpread * RADIAN;
		const beta = newSpread * RADIAN;

		const coef = Math.tan(beta) / Math.tan(alpha);
		config.setOutputParam('scaleX', coef);
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
			board: (parameter, value) => {
				config.setInputParam(parameter, value);
			},

			width: (width, value) => {
				setMaxCount(value);
			},

			typeTree: (parameter, value) => {
				if (parameter === 'branch') {
					setCount();

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
					setCount();

					updateScandTree(value);
				} else if (parameter === 'trunk') {
					deleteScandTree();

					config.setInputParam(parameter, value);

					setSpread();
					setCount();

					showScandTree();
					makeTransform();
				}
			},

			trunk: (parameter, value) => {
				deleteScandTree();

				config.setInputParam(parameter, value);

				setSpread();
				setCount();

				showScandTree();
				makeTransform();
			},

			branch: (parameter, value) => {
				setCount();

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
			},

			spread: (parameter, value) => {
				setCount();
				updateScandTree(value);
			}
		};

		const { parameter, value } = options;

		const strategy = strategies[parameter];

		strategy(parameter, value);
	}

	function getInputValues() {
		const inputsHolder = config.getInputHolder();
		const inputs = inputsHolder.querySelectorAll('input');

		for (let i = 0, len = inputs.length; i < len; i += 1) {
			const property = inputs[i].getAttribute('data-parameter');
			const value = +inputs[i].getAttribute('value');

			config.setInputParam(property, value);
		}
	}

	function setInputHolder(elem) {
		config.setInputHolder(elem);
	}

	const resetParams = () => {
		deleteScandTree();

		getInputValues();
		setSpread();

		setCount();

		showScandTree();
	};

	function init(input) {
		setInputHolder(input);

		getInputValues();
		setSpread();

		setMaxWidthLimit();
		setMaxSpread();

		showScandTree();

		// showHeightScandTree();
		// showWidthScandTree();

		// showAdminBrowser();
		// showAdminConsole();
	}

	init(inputsHolder);

	return {
		resetParams,
		handlerInput
	};
};

export default threeD;

/*function showCountBrowser() {
		const count = config.getOutputParam('count');
		const elem = document.querySelector(wrapper.output.count);

		if (elem) {
			elem.innerHTML = count;
		}
	}*/

/*function showAllWidthBrowser() {
	const width = config.getOutputParam('allWidth');
	const elem = document.querySelector(wrapper.output.allWidth);

	if (elem) {
		elem.innerHTML = width;
	}
}*/

/*function showRemainderBrowser() {
	const remainder = config.getOutputParam('remainder');

	const title = '<span>remainder: </span>';
	const description = `<span class="remainder">${remainder}</span>mm`;
	const elem = document.querySelector(wrapper.output.remainderHolder);

	if (elem) {
		elem.innerHTML = title + description;
	}
}*/

/*function showNumberBoardBrowser() {
	const number = config.getBoardParam('numberBoard');
	const elem = document.querySelector(wrapper.output.numberBoard);

	if (elem) {
		elem.innerHTML = number;
	}
}*/

/*function showPieceWidthBrowser() {
	document.querySelector(wrapper.output.piece_width).innerHTML = '';

	const piece = config.getOutputParam('piece');

	const trunk = config.getInputParam('trunk');
	const branch = config.treeParam('branch');

	const type = branch + trunk;

	const head = '<h3>longs</h3>';

	let list = '<ol>';

	for (let i = 0, j = 1, len = piece.length; i < len; i += 1) {
		if (i % type === 0) {
			list += '<li>';
		}

		list += '<span>' + piece[i] + '</span> ';

		if (j % type === 0) {
			list += '</li>';
		}

	}

	list += '</ol>';


	$(wrapper.output.pieceWidthHolder).html(head + list);
	selector = wrapper.output.piece_width;
	document.querySelector(selector).innerHTML = head + list;
}*/

/*function showCountConsole() {
	const count = config.getOutputParam('count');

	console.log('Count: %d', count);
}*/

/*function showAllWidthConsole() {
	const width = config.getOutputParam('allWidth');

	console.log('All Width: %s mm', width);
}*/

/*function showRemainderConsole() {
	const remainder = config.getOutputParam('remainder');

	console.log('Remainder: %d mm', remainder);
}*/

/*function showNumberBoardConsole() {
	const number = config.getBoardParam('numberBoard');

	console.log('Number Board: %s mm', number);
}*/

/*function showPieceWidthConsole() {
	const piece = config.getOutputParam('piece');

	console.log('piece: ', piece);
}*/

/*function showAdminBrowser() {
	showAllWidthBrowser();
	showCountBrowser();
	showNumberBoardBrowser();
	showRemainderBrowser();
	showPieceWidthBrowser();
}*/

/*function showAdminConsole() {
	showAllWidthConsole();
	showCountConsole();
	showNumberBoardConsole();
	showRemainderConsole();
	showPieceWidthConsole();
}*/

/*function pieceDistribution() {
	const longBoard = config.getInputParam('longBoard');

	const count = config.getOutputParam('count');
	const raw = config.getBoardParam('raw');
	const allWidth = config.getOutputParam('allWidth');
	const width =  count * raw + allWidth;

	if (width > longBoard) {
		const quotient = width / longBoard;

		config.setBoardParam('numberBoard', Math.ceil(quotient));
	} else {
		config.setBoardParam('numberBoard', 1);
	}

	const numberBoard = config.getBoardParam('numberBoard');
	const ramainderValue = parseInt(numberBoard * longBoard - width, 10);

	config.setOutputParam('remainder', ramainderValue);
}*/

/*function getHeightHolder() {
	return document.getElementById(wrapper.treeHolder).style.height;
}*/

/*function getHeightByOwner() {
	const owner = config.getOwner();
	const count = config.getOutputParam('count');

	if (owner === 'user') {
		return Math.floor(getHeightHolder() / count);
	} else if (owner === 'admin') {
		return config.getInputParam('height');
	} else {
		console.log('No Owner');
		return 0;
	}
}*/

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

/*function showWidthScandTree() {
		const delta = config.getOutputParam('delta');
		const count = config.getOutputParam('count');

		const fulcrum = config.getInputParam('width');
		const maxWidthDec = 2 * (count - 2) * delta + fulcrum - 2 * delta;

		const maxWidth = parseInt(maxWidthDec, 10);
		const elem = document.querySelector(wrapper.output.width);

		if (elem) {
			elem.innerHTML = maxWidth;
		}
	}*/

/*function showHeightScandTree() {
	const count = config.getOutputParam('count');
	const boardHeight = config.getInputParam('height');

	const stHeight = count * boardHeight;
	const elem = document.querySelector(wrapper.output.height);

	if (elem) {
		elem.innerHTML = stHeight;
	}
}*/
