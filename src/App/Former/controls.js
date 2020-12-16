const cls = 'lock';
const usual = {
	width: 16,
	height: 10,
	long: 1000,
	trunk: 2,
	branch: 7,
	spread: 25
};
let isChange = false;
let parent = null;
let elem = null;
let resetBtn = null;
let input = null;

function unlockAll() {
	const elems = parent.getElementsByClassName(cls);
	const len = elems.length;

	if (elems) {
		for (let i = len - 1; i >= 0; i -= 1) {
			if (elems[i].classList.contains(cls)) {
				elems[i].classList.remove(cls);
			}
		}
	}
}

function setDefaultValues() {
	const inputs = parent.getElementsByTagName('INPUT');

	for (let i = 0, len = inputs.length; i < len; i += 1) {
		const property = inputs[i].getAttribute('data-parameter');
		const value = usual[property];

		inputs[i].setAttribute('value', value);
	}
}

function unLockResetBtn() {
	if (resetBtn.classList.contains(cls)) {
		resetBtn.classList.remove(cls);

		isChange = true;
	}
}

function lockResetBtn() {
	if (resetBtn.classList.contains(cls) === false) {
		resetBtn.classList.add(cls);

		isChange = false;
	}
}

const generateChangeEvent = (input) => {
	if (input) {
		const inputChange = new Event('change');

		input.dispatchEvent(inputChange);
	}
};

const visibleBtn = {
	show: (elem) => {
		if (elem) {
			elem.classList.remove(cls);
		}
	},

	hide: (elem) => {
		if (elem) {
			elem.classList.add(cls);
		}
	}
};

function changeParam(input, sib, step) {
	if (input && sib && step) {
		const min = +input.getAttribute('min');
		const max = +input.getAttribute('max');
		const value = +input.getAttribute('value') + step;

		if (min <= value && value <= max) {
			input.setAttribute('value', value);

			visibleBtn['show'](sib);
		} else {
			visibleBtn['hide'](elem);
		}

		if (min === value || value === max) {
			visibleBtn['hide'](elem);
		} else {
			visibleBtn['show'](sib);
		}
	}
}

const signAction =  {
	up: (input) => {
		if (input) {
			const prevSib = elem.previousElementSibling;
			const step = +input.getAttribute('step');

			changeParam(input, prevSib, step);
		}
	},

	down: (input) => {
		if (input) {
			const nextSib = elem.nextElementSibling;
			const step = +input.getAttribute('step') * -1;

			changeParam(input, nextSib, step);
		}
	}
};

const controls = (target, inputsHolder, threeD) => {
	const handlers = {
		toggle: () => {
			parent.classList.toggle('open');
		},

		change: () => {
			isChange = true;

			const liParent = elem.parentNode.parentNode;
			input = liParent.querySelector('input');
			// console.log('input', input);

			const sign = elem.getAttribute('data-action-change');
			// console.log('sign', sign);

			if (sign) {
				signAction[sign](input);
			}

			generateChangeEvent(input);
			unLockResetBtn();

			handleChange(input);
		},

		reset: () => {
			if (isChange) {
				setDefaultValues();
				threeD.resetParams();
				unlockAll();
				lockResetBtn();
			}
		}
	};

	function getInputParameters(input) {
		const min = +input.getAttribute('min');
		const max = +input.getAttribute('max');
		const value = +input.getAttribute('value');

		if (min <= value && value <= max) {
			const parameter = input.getAttribute('data-parameter');

			const options = {
				value,
				parameter
			};

			threeD.handlerInput(options);
		}
	}

	function handleChange(input) {
		getInputParameters(input);
	}

	function init(target, holder) {
		parent = holder;
		elem = target;
		resetBtn = holder.getElementsByClassName('reset')[0];

		const action = target.getAttribute('data-action');

		if (action) {
			const handler = handlers[action];
			handler();
		}
	}

	init(target, inputsHolder);
};

export default controls;

/*function lockControl(elem) {
		if (elem) {
			const value = elem.getAttribute('value');

			elem.setAttribute('max', value);
		}
	}*/

/*function unlockControl(elem, value) {
	if (elem && value) {
		elem.setAttribute('max', value);
	}
}*/

/*function getInput(name) {
	const selector = 'input[data-parameter="' + name + '"]';

	return inputsHolder.querySelector(selector);
}*/

/*function getPlusBtn(input) {
	return input.nextElementSibling.querySelector('.up');
}*/

/*function checkMaxSpread() {
	const spread = getInput('spread');
	const branch = getInput('branch');
	const trunk = getInput('trunk');

	const branchPlusBtn = getPlusBtn(branch);
	const trunkPlusBtn = getPlusBtn(trunk);

	const valueSpread = spread.getAttribute('value');
	const maxSpread = spread.getAttribute('max');

	if (valueSpread === maxSpread) {
		visibleBtn['hide'](branchPlusBtn);
		visibleBtn['hide'](trunkPlusBtn);

		lockControl(branch);
		lockControl(trunk);
	} else {
		const MAX_BRANCH = '10';
		const MAX_TRUNK = '3';

		visibleBtn['show'](branchPlusBtn);
		visibleBtn['show'](trunkPlusBtn);

		unlockControl(branch, MAX_BRANCH);
		unlockControl(trunk, MAX_TRUNK);
	}
}*/
