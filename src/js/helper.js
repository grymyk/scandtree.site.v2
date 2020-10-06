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
	// console.log(fns);

	fns.forEach((fn) => {
		// console.log(fn);

		fn();
	});
};

app.prepend = (components) => {
	const loads = insertPage(components);

	loadFns(loads);
};

export default {
	prepend: app.prepend
};
