import Former from './former';

const sectionFormer = new Former({
	title: 'former',
	inputs: {
		subtitle: 'ins',
		reset: 'reset',
		params: [{
			name: 'height',
			value: '10',
			min: '1',
			max: '40',
			step: '1',
			cls: 'readonly'
		}, {
			name: 'width',
			value: '30',
			min: '1',
			max: '40',
			step: '1',
			cls: 'readonly'
		}, {
			name: 'trunk',
			value: '2',
			min: '1',
			max: '3',
			step: '1',
			cls: 'readonly'
		}, {
			name: 'branch',
			value: '7',
			min: '5',
			max: '10',
			step: '1',
			cls: 'readonly'
		}, {
			name: 'spread',
			value: '25',
			min: '15',
			max: '90',
			step: '1',
			cls: 'readonly'
		}]
	},
	outputs: {
		subtitle: 'outs',
		params: [
			'height',
			'max_width'
		]
	}
});

export default sectionFormer.elem;
