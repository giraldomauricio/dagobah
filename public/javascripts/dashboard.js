function InitWelcomeScreen()
{
	 // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        url: '/dashboard',
        dataType: 'JSON'
    }).done(function( response ) {
    		console.log(response)
    });
    $(document).ready(function() {
		    $('#Dashboard').on('click', GoToDash);
		});
}

function GoToDash()
{
	alert('to the dash');
}