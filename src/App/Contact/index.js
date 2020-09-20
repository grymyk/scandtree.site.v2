import './contact.scss';
import Contact from './contact';

const sectionContact = new Contact({
	title: 'contacts',
	desc: 'You can order or make some custom scandinavian' +
		'tree to contacts us below',
	contacts: [{
		name: 'phone:',
		value: '+38(093) 631-70-33',
		href: 'tel:+38(093) 631-70-33'
	}, {
		name: 'email:',
		value: 'info@scandinaviantree.com',
		href: 'mailto:info@scandinaviantree.com?subject=Scandinavian Tree'
	}],
	subtitle: 'Make an order',
	action: 'mailer.php',
	inputs: [{
		name: 'name',
		placeholder: 'Mykola',
		type: 'text',
		autocomplete: 'name'
	}, {
		name: 'phone',
		placeholder: '+380936317033',
		type: 'tel',
		autocomplete: 'tel'
	}, {
		name: 'email',
		placeholder: 'mykola@gmail.com',
		type: 'email',
		autocomplete: 'email'
	}],
	textarea: {
		name: 'message',
		placeholder: 'Hello Scandinavian Tree',
		rows: '6'
	}
});

export default sectionContact.elem;
