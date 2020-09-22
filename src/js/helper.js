const app = {};

const insertPage = (components) => {
	const page = new DocumentFragment();
	const loads = [];

	components.forEach((component) => {
		page.append(component);

		if (component.load) {
			loads.push(component.load);
		}
	});

	document.body.prepend(page);

	return loads;
};

const loadFns = (fns) => {
	fns.forEach((fn) => fn());
};

app.prepend = (components) => {
	const loads = insertPage(components);

	loadFns(loads);
};

export default {
	prepend: app.prepend
};


/*
const filter = (options) => {
	const { src, dest, key, operator, callback } = options;

	src.forEach((elem) => {
		dest.operator(elem.key);
	});

	callback(dest);
};

const iterate = (data) => {
	data.forEach((elem) => {
		dest.operator(elem);
		dest.operator(elem.key);
	});


};
*/

