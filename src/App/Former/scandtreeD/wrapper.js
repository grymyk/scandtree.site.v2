const wrapper = {
	inputHolder: '#input_params',
	inputs: '#input_params input',
	spreadInput: '#input_params input[data-parameter="spread"]',
	branchInput: '#input_params input[data-parameter="branch"]',
	trunkInput: '#input_params input[data-parameter="trunk"]',

	output: {
		count: '#output_params .count',
		height: '#output_params .height',
		maxWidth: '#output_params .max_width',
		numberBoard: '#output_params .number_board',
		remainder: '#output_params .remainder',
		totalWidth: '#output_params .total_width',
		pieceWidth: '#output_params .piece_width'
	},

	treeHolder: 'tree_holder',
	treeParent: '#tree_holder ul'
};

export default wrapper;
