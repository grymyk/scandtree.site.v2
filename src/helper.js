const app = {};

app.append = (components) => {
    document.addEventListener("DOMContentLoaded", () => {
        // const {parent, child} = props;

        // parent.appendChild(child);

        components.forEach( (component) => {
            document.body.appendChild(component);
        });
    });
};


export default app.append;
