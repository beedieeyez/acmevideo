$(document).ready(function() {
    $.ajax({
        url: "http://localhost:9090/api/",
        type: 'GET',
        'dataType': 'json'
    }).then(function(data) {
       $('.greeting-id').append(data.fname);
       $('.greeting-content').append(data.lname);
    });
});
