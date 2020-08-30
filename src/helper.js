const app = {};

app.append = (props) => {
    document.addEventListener("DOMContentLoaded", () => {
        const {parent, child} = props;

        parent.appendChild(child);
    });
};


export default app.append;
