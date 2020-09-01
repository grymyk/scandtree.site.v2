import Contact from './contact';

const sectionContact = new Contact({
    title: 'contacts',
    desc: 'You can order or make some custom scandinavian tree to contacts us below',
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
        type: 'text',
        placeholder: 'Mykola',
        autocomplete: 'name'
    }, {
        name: 'email',
        type: 'email',
        placeholder: 'mykola@gmail.com',
        autocomplete: 'email'
    }, {
        name: 'phone',
        type: 'phone',
        placeholder: '+380936317033',
        autocomplete: 'tel'
    }],

    textarea: {
        name: 'message',
        placeholder: 'Hello Scandinavian Tree ...',
        rows: '6'
    }
})

export default sectionContact.elem;
