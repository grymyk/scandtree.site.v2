import './contact.scss';
import Contact from './contact';

const sectionContact = new Contact({
	title: 'contacts',
	desc: 'You can order or make some custom scandinavian' +
		'tree to contacts us below',
	contacts: [{
		name: 'email:',
		value: 'info@scandinaviantree.com',
		href: 'mailto:info@scandinaviantree.com?subject=Scandinavian Tree'
	}],
	subtitle: 'Make an order',
	action: 'mailer.php',
	inputs: [{
		name: 'name',
		placeholder: 'Alica',
		required: 'required',
		type: 'text',
		autocomplete: 'name',
	}, {
		name: 'phone',
		placeholder: '+46(0)8-453 81 40',
		required: '',
		type: 'tel',
		autocomplete: 'tel',
	}, {
		name: 'email',
		placeholder: 'alica.olsson@gmail.com',
		required: 'required',
		type: 'email',
		autocomplete: 'email'
	}],
	textarea: {
		name: 'message',
		placeholder: 'Hi Scandinavian Tree',
		required: 'required',
		rows: '6',
	}
});

export default sectionContact.elem;
