// DOM Ready =============================================================
$(document).ready(function() {
    //Update User Info
    $('#btnLogin').on('click', LoginUser);
    $('#btnAddOrg').on('click', AddOrganization);
    $('#btnAddProfile').on('click', AddProfile)
    $('#btnAddLocation').on('click', AddLocation);
    $('#btnAddQuestion').on('click', AddQuestion);
    
    LoadOrganizations();
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

        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
            $('#addUser fieldset input').val('');

            // Update the table
            populateTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });
}

function AddOrganization()
{
    // If it is, compile all user info into one object
        var newOrganization = {
            'name': $('#organizationName').val(),
            'create_at': new Date(),
            'account': {'type': 'BACKER'}
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newOrganization,
            url: '/admin/create_organization',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

               LoadOrganizations();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
}

function LoadOrganizations()
{
    // Empty content string
    var tableContent = '<table>';

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/get_organization', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        // Stick our user data array into a userlist variable in the global object
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += "<td>"+this.name + "</td>";
            tableContent += "<td><a href=\"#\" onclick=\"ShowProfileForm('"+this._id+"');\">Create Profile</a></td>";
            tableContent += "<td><a href=\"#\" onclick=\"ShowLocationForm('"+this._id+"');\">Create Location</a></td>";
            tableContent += "<td><a href=\"#\" onclick=\"ShowQuestionForm('"+this._id+"');\">Create Question</a></td>";
            tableContent += "<td><a href=\"#\" onclick=\"ShowOrganizationInfo('"+this._id+"');\">Show Organization Info</a></td>";
            tableContent += "<td><a href=\"#\" onclick=\"ShowOrganizationInfoBulk('"+this._id+"');\">Show Organization Info(BULK)</a></td>";
            tableContent += '</tr>';
        });
        tableContent += '</table>';
        // Inject the whole content string into our existing HTML table
        $('#OrgList').html(tableContent);
    });
}
var orgId
function ShowProfileForm(id)
{
    orgId = id;
    $("#ProfileForm").show();
}
function AddProfile()
{
    var newProfile = {
            'name': $('#profileName').val(),
            'password': '',
            'email': $('#profileEmail').val(),
            'phone': $('#profilePhone').val(),
            'create_at': new Date(),
            'master': $('#profileMaster').prop("checked"),
            'organization_id': orgId,
            'reset_password': true,
            'active': true
        }
    
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: newProfile,
        url: '/admin/create_profile',
        dataType: 'JSON'
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

           LoadOrganizations();
           $("#ProfileForm").hide();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });
}
function ShowLocationForm(id)
{
    orgId = id;
    $("#LocationForm").show();
}
function AddLocation()
{
    var newLocation = {
            'name': $('#locationName').val(),
            'address1': $('#locationAddress1').val(),
            'address2': $('#locationAddress2').val(),
            'phone': $('#locationPhone').val(),
            'create_at': new Date(),
            'zipcode': $('#locationZipcode').val(),
            'organization_id': orgId,
            'status': $('#locationStatus').prop("checked")
        }
    
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: newLocation,
        url: '/admin/create_location',
        dataType: 'JSON'
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

           LoadOrganizations();
           $("#LocationForm").hide();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });
}
function ShowQuestionForm(id)
{
    orgId = id;
    $("#QuestionForm").show();
}
function AddQuestion()
{
    var newQuestion = {
            'name': $('#questionText').val(),
            'type': $('#questioType').val(),
            'create_at': new Date(),
            'organization_id': orgId
        }
    
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: newQuestion,
        url: '/admin/create_question',
        dataType: 'JSON'
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

           LoadOrganizations();
           $("#QuestionForm").hide();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });
}
function ShowOrganizationInfo(id)
{
    // Empty content string
    var tableContent = '<table>';

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/get_organization/' + id, function( data ) {
        
        // For each item in our JSON, add a table row and cells to the content string
        // Stick our user data array into a userlist variable in the global object
        tableContent += data.name + "<br/>";
        tableContent += data.account.type + "<br/>";
        $.getJSON( '/admin/get_profiles/' + id, function( profiles ) {
            tableContent += "PROFILES<br/>";
            // For each item in our JSON, add a table row and cells to the content string
            // Stick our user data array into a userlist variable in the global object
            $.each(profiles, function( index, value ) {
              tableContent += value.name + "<br/>";
            });
            $.getJSON( '/admin/get_locations/' + id, function( questions ) {
                tableContent += "LOCATIONS<br/>";
                // For each item in our JSON, add a table row and cells to the content string
                // Stick our user data array into a userlist variable in the global object
                $.each(questions, function( index, value ) {
                  tableContent += value.name + "<br/>";
                  tableContent += value.zipcode + "<br/>";
                });
                $.getJSON( '/admin/get_questions/' + id, function( questions ) {
                    tableContent += "QUESTIONS<br/>";
                    // For each item in our JSON, add a table row and cells to the content string
                    // Stick our user data array into a userlist variable in the global object
                    $.each(questions, function( index, value ) {
                      tableContent += value.name + "<br/>";
                      tableContent += value.type + "<br/>";
                    });
                    tableContent += '</tr>';
                    tableContent += '</table>';
                    // Inject the whole content string into our existing HTML table
                    $('#OrgInfo').html(tableContent);
                });
            });
            
        });
    });

    
}
function ShowOrganizationInfoBulk(id)
{
    // Empty content string
    var tableContent = '<table>';

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/get_organization_full/' + id, function( data ) {
        
        // For each item in our JSON, add a table row and cells to the content string
        // Stick our user data array into a userlist variable in the global object
        tableContent += data.name + "<br/>";
        tableContent += data.account.type + "<br/>";
        tableContent += "PROFILES<br/>";
        $.each(data.profiles, function( index, value ) {
          tableContent += value.name + "<br/>";
        });
        tableContent += "LOCATIONS<br/>";
        $.each(data.locations, function( index, value ) {
          tableContent += value.name + "<br/>";
          tableContent += value.zipcode + "<br/>";
        });
        tableContent += "QUESTIONS<br/>";
        $.each(data.questions, function( index, value ) {
          tableContent += value.name + "<br/>";
          tableContent += value.type + "<br/>";
        });
        tableContent += '</tr>';
        tableContent += '</table>';
        // Inject the whole content string into our existing HTML table
        $('#OrgInfo').html(tableContent);
    });

    
}