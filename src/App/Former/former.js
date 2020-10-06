import './css/basictree.scss';
import formerTemplate from './former.handlebars';

import controls from './controls.js';
import threeD from './threeD.js';

let handlerInput = null;

class Former {
	constructor(options) {
		this.elem = document.createElement('div');
		this.elem.id = 'former';
		this.elem.innerHTML = formerTemplate(options);
		this.elem.load = this.loadHandler;

		this.panel = this.elem.querySelector('#input_params');
		this.panel.addEventListener('click', this.panelHandler);
	}

	panelHandler(event) {
		const target = event.target;
		const inputParams = document.getElementById('input_params');

		controls(target, inputParams, handlerInput);
	}

	loadHandler() {
		const inputParams = document.getElementById('input_params');

		handlerInput = threeD(inputParams);
	}
}

export default Former;
