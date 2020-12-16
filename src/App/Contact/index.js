import './contact.scss';
import Contact from './contact';

const name = 'team@scandinaviantree.com';
const hyperRef = `mailto:${name}?subject=Scandinavian Tree`;

const sectionContact = new Contact({
	title: 'contacts',
	desc: 'You can order or make some custom scandinavian' +
		'tree to contacts us below',
	contacts: [{
		name: 'email:',
		value: name,
		href: hyperRef
	}],
	subtitle: 'Make an order',
	action: 'mailer.php',
	inputs: [{
		name: 'name',
		placeholder: 'Alica',
		type: 'text',
		autocomplete: 'name',
	}, {
		name: 'email',
		placeholder: 'alica.olsson@gmail.com',
		type: 'email',
		autocomplete: 'email'
	}],
	textarea: {
		name: 'message',
		placeholder: 'Hi Scandinavian Tree,',
		rows: '6',
	}
});

export default sectionContact.elem;
