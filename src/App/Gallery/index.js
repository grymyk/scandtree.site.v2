import Gallery from './gallery';

const sectionGallery = new Gallery({
    title: 'gallery',
    desc: 'Christmas tree in Scandinavian style can easily minimized by rotating branches and it can easy\n' +
        'to dress up. Toys can be placed or hung on a branch.',
    images: [{
            name: 'top_left.jpg',
            title: 'Scandinavian Tree'
        }, {
            name: 'top_right.jpg',
            title: 'Scandinavian Tree'
        }, {
            name: 'middle_left.jpg',
            title: 'Scandinavian Tree'
        }, {
            name: 'middle_right.jpg',
            title: 'Scandinavian Tree'
        }, {
            name: 'bottom_left.jpg',
            title: 'Scandinavian Tree'
        }, {
            name: 'bottom_right.jpg',
            title: 'Scandinavian Tree'
    }]
})

const gallery = document.createDocumentFragment();

gallery.appendChild(sectionGallery.elem);

export default gallery;
