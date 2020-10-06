import config from './config';

const boardForm = {
	getFrontPlaneStyles(options) {
		const { width, height, translateZ } = options;
		const { zAxis } = translateZ;
		const rotate = 'rotateY(0)';

		return `style = "width: ${width}px; height: ${height}px;
			transform: ${rotate} translateZ(${zAxis});"`;
	},

	getBackPlaneStyles(options) {
		const { width, height, translateZ } = options;
		const { zAxis } = translateZ;
		const rotate = 'rotateY(180deg)';

		return `style = "width: ${width}px; height: ${height}px;
			transform: ${rotate} translateZ(${zAxis});"`;
	},

	getRightPlaneStyles(options) {
		const { deep, height, left, translateZ } = options;
		const { xzAxis } = translateZ;
		const rotate = 'rotateY(90deg)';

		return `style = "width: ${deep}px;
			height: ${height}px; left: ${left}px;
			transform: ${rotate} translateZ(${xzAxis});"`;
	},

	getLeftPlaneStyles(options) {
		const { deep, height, left, translateZ } = options;
		const { xzAxis } = translateZ;
		const rotate = 'rotateY(-90deg)';

		return `style = "width: ${deep}px;
			height: ${height}px; left: ${left}px;
			transform: ${rotate} translateZ(${xzAxis});"`;
	},

	getTopPlaneStyles(options) {
		const { width, deep, top, translateZ } = options;
		const { yAxis } = translateZ;
		const rotate = 'rotateX(90deg)';

		return `style = "width: ${width}px;
			height: ${deep}px; top: ${top}px;
			transform: ${rotate} translateZ(${yAxis});"`;
	},

	getBottomPlaneStyles(options) {
		const { width, deep, top, translateZ } = options;
		const { yAxis } = translateZ;
		const rotate = 'rotateX(-90deg)';

		return `style = "width: ${width}px;
			height: ${deep}px; top: ${top}px;
			transform: ${rotate} translateZ(${yAxis});"`;
	},

	branchTemplate(options) {
		const frontPlane = boardForm.getFrontPlaneStyles(options);
		const backPlane = boardForm.getBackPlaneStyles(options);
		const rightPlane = boardForm.getRightPlaneStyles(options);
		const leftPlane = boardForm.getLeftPlaneStyles(options);
		const topPlane = boardForm.getTopPlaneStyles(options);
		const bottomPlane = boardForm.getBottomPlaneStyles(options);

		return `<div class="prism_holder">
			<div class="prism">
				<div class="face front branch side_view" ${frontPlane}></div>
				<div class="face back branch side_view" ${backPlane}></div>
				<div class="face right branch side_view" ${rightPlane}></div>
				<div class="face left branch side_view" ${leftPlane}></div>
				<div class="face top branch side_view" ${topPlane}></div>
				<div class="face bottom branch side_view" ${bottomPlane}></div>
			</div>
		</div>`;
	},

	getTranslateZ(options) {
		const { width, height, deep } = options;

		return {
			xzAxis: parseInt(width / 2, 10) + 'px',
			yAxis: parseInt(height / 2, 10) + 'px',
			zAxis: parseInt(deep / 2, 10) + 'px'
		};
	},

	getBoardTemplate(width) {
		width = parseInt(width, 10);
		const height = parseInt(config.getInputParam('height'), 10);

		const deep = 40;
		const xyz = { width, height, deep };

		const left = parseInt((width - deep) / 2, 10);
		const top = parseInt((height - deep) / 2, 10);
		const translateZ = boardForm.getTranslateZ(xyz);

		const options = { width, height, deep, translateZ, left, top };

		return boardForm.branchTemplate(options);
	},

	branchStyleTemplate(options) {
		const { width, zIndex } = options;

		return `width: ${width}px; z-index: ${zIndex}`;
		// height: ${heigt}px;
	},

	setBoardStyles(zIndex, width) {
		const height = config.getInputParam('height');

		const options = {
			zIndex,
			width: parseInt(width, 10),
			height: parseInt(height, 10)
		};

		return boardForm.branchStyleTemplate(options);
	}
};

export default {
	setBoardStyles: boardForm.setBoardStyles,
	getBoardTemplate: boardForm.getBoardTemplate
};
