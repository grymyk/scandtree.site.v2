const app = {};

app.append = (components) => {
	components.forEach((component) => {
		document.body.append(component);
	});
};

export default {
	append: app.append
};
