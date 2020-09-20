import Gallery from './gallery';

const sectionGallery = new Gallery({
	title: 'gallery',
	desc: 'Christmas tree in Scandinavian style can easily' +
		'minimized by rotating branches and it can easy\n' +
		'to dress up. Toys can be placed or hung on a branch.',
	images: [{
		name: 'top_left.jpg',
		subtitle: 'Scandinavian Tree',
		alt: 'scandinavian tree'
	}, {
		name: 'top_right.jpg',
		subtitle: 'Scandinavian Tree',
		alt: 'scandinavian tree'
	}, {
		name: 'middle_left.jpg',
		subtitle: 'Scandinavian Tree',
		alt: 'scandinavian tree'
	}, {
		name: 'middle_right.jpg',
		subtitle: 'Scandinavian Tree',
		alt: 'scandinavian tree'
	}, {
		name: 'bottom_left.jpg',
		subtitle: 'Scandinavian Tree',
		alt: 'scandinavian tree'
	}, {
		name: 'bottom_right.jpg',
		subtitle: 'Scandinavian Tree',
		alt: 'scandinavian tree'
	}]
});

export default sectionGallery.elem;
