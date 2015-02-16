// DOM Ready =============================================================
$(document).ready(function() {
    //Update User Info
    $('#btnLogin').on('click', LoginUser);
});

function LoginUser()
{
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: {
            username: $('#userName').val(),
            password: $('#password').val()
        },
        url: '/login/login',
        dataType: 'JSON'
    }).done(function( response ) {

        if(response.msg)
        {
            window.location.replace('/location/start');
        }
    });
}