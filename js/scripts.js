// $(document).ready(function() {
// 	$('input, textarea').placeholder();
// 	$.localScroll({offset: {top: -64}});
// });

jQuery(function($) {

	$.localScroll({
		onBefore: function() {
			console.log('hi');
		},
		onAfter: function() {
			console.log('bye');
		}
	});

})

$('#contact-form').submit(function() {
	$.ajax({
		dataType: 'jsonp',
		url: 'http://getsimpleform.com/messages/ajax?form_api_token=5268bb70acccc8d2d61fda8949e6d556',
		data: $('#contact-form').serialize()
	}).done(function() {
		// Reset the form
		$('#contact-form')[0].reset.click();

		// Scroll to success msg
		$.scrollTo($('#submit-msg'), 500,{offset: {top:-60}});

		// Animate success msg in, then out
		$('#submit-msg').animate({ opacity: 1 }, 750, 
			function() {
				window.setTimeout(function() {
					$('#submit-msg').animate({ opacity: 0 }, 500);
				}, 3500);
			});
	});
	return false;		// Prevent normal form submission
});