const menu = {};

menu.getMetrix = (elem) => {
    const parent = elem;
    const style = window.getComputedStyle(parent);

    const width = style.getPropertyValue('width');
    const left = parent.offsetLeft + 'px';

    return { width, left };
};

menu.getMetrixes = (items) => {
    const metrixItems = [];

    items.forEach((elem) => {
        const metrixItem = this.getMetrix(elem);
        metrixItems.push(metrixItem);
    });

    return metrixItems;
};

menu.metrixes = {};

menu.init = () => {
    const menuItems = document.querySelectorAll('#desktop li');

    this.metrixes = this.getMetrixes(menuItems);

    console.log(this.metrixes);
};

export default {
    menu: menu.init
};
