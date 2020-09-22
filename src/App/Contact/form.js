import $ from 'jquery';

const ajax = () => {
	const form = document.getElementById('ajax-contact');
	const formMessages = document.getElementById('form-messages');
	const formMessagesClsList = formMessages.classList;

	$(form).submit((event) => {
		event.preventDefault();

		formMessagesClsList.add('board_spinner');

		$.ajax({
			type: 'POST',
			url: form.getAttribute('action'),
			data: $(form).serialize()
		}).done((response) => {
			$(formMessages).removeClass('error board_spinner');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#phone').val('');
			$('#message').val('');
		}).fail((data) => {
			$('input[type="submit"]').removeClass('disable');
			$(formMessages).removeClass('success board_spinner');
			$(formMessages).addClass('error');

			if (data.responseText) {
				$(formMessages).text(data.responseText);
				// $(formMessages).html(data.responseText);
			} else {
				$(formMessages).text('Your message could not be sent.');
			}
		});
	});

	$(form).on('focus', 'input, textarea', () => {
		$(formMessages).text('');
	});
};

export default ajax;
