const wrapper = {
	inputHolder: '#input_params',
	inputs: '#input_params input',
	spreadInput: '#input_params input[data-parameter="spread"]',
	branchInput: '#input_params input[data-parameter="branch"]',
	trunkInput: '#input_params input[data-parameter="trunk"]',

	output: {
		height: '.output .height',
		width: '.output .width',
		allWidth: '.output .all_width',
		count: '.output .count',
		numberBoard: '.output .number_board',
		remainderHolder: '.output .remainder_holder',
		pieceWidthHolder: '.output .piece_width_holder'
	},

	treeHolder: 'tree_holder',
	treeParent: '#tree_holder ul'
};

export default wrapper;
