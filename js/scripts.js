$(document).ready(function() {
	$('input, textarea').placeholder();			// Placeholder polyfill
	$.localScroll({offset: {top: -64}});		// Enable local scrolling to anchor tags
});

var formVal = (function ($) {

	var validate = function($form) {
		var inputs 			= $form.find('input, textarea'),
				emailRegex 	= RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"),
				errorMsgs		= {
					name: 		"Name must be at least than 6 characters.",
					email: 		"Email address invalid.",
					subject: 	"Please enter a subject",
					message: 	"Please enter a message"
				},
				errors 			= [];

		[].forEach.call(inputs, function (input) {
			// test name for length >= 6
			if (input.name === "name" && input.value.length < 6) {
				errors.push(errorMsgs["name"]);

			// test email to match emailRegex
			} else if (input.name === "email" && !input.value.match(emailRegex)) {
				errors.push(errorMsgs["email"]);

			// all other tests
			} else if (input.value.length < 1) {
				errors.push(errorMsgs[input.name]);
			}
		});

		return errors;
	}

	return {
		validate: validate
	}

})(jQuery);

// AJAX #contact-form submit
$('#contact-form').submit(function() {

	var errors 	= formVal.validate($('#contact-form')),
			$msg 		= $('#submit-msg'),
			inOut		= function($el) {
				$el.animate({ opacity: 1 }, 750, 
				function() {
					window.setTimeout(function() {
						$el.animate({ opacity: 0 }, 500);
					}, 5000);
				});
			},
			finish	= function() {
				$.scrollTo($msg, 500,{offset: {top:-60}});
				$msg.html("Thanks for your message, I look forward to speaking with you!");
				inOut($msg);
			};

	if (errors.length) {
		var errorMsgs = $('<ul class="errors">');

		errors.forEach(function(e) {
			errorMsgs.append('<li>' + e + '</li>');
		})

		// Populate error msgs
		$msg.html(errorMsgs);

		// Scroll to failure msg
		$.scrollTo($msg, 500,{offset: {top:-60}});

		// Animate failure msg in, then out
		inOut($msg);
	} else {

		// Submit form via ajax
		$.ajax({
			dataType: 'jsonp',
			url: 'http://getsimpleform.com/messages/ajax?form_api_token=44099459d7deecbb074c44242299972e',
			data: $('#contact-form').serialize()
		}).done(function() {
			// Reset the form
			$('#contact-form')[0].reset.click();
			

			if ($msg.css('opacity') == 1) {
				$msg.animate({opacity: 0}, 500, function () {
					finish();
				});
			} else if ($msg.is(':animated')) {
				$msg.promise().done(function() {
					finish();
				});
			} else {
				finish();
			}
		});
	}
	return false;		// Prevent normal form submission
});

