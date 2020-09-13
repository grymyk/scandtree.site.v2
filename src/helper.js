const app = {};

app.append = (components, fn) => {
    // console.log(components);

    components.forEach((component) => {
        // console.log(component.id);
        document.body.append(component);
    });

    fn('load');
};

export default app.append;
