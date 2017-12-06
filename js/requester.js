$(document).ready(function() {
  
  $('#request-form').submit(function(e) {
    e.preventDefault(e);

    var requestForm = $('#request-form');
    var method = requestForm.find('select[name="method"]').val();
    var url = requestForm.find('input[name="url"]').val();
    var data = requestForm.find('textarea[name="data"]').val();
    var token = requestForm.find('input[name="token"]').val();

    console.log('Sending ' + method + ' request to ' + url);

    $.ajax({
        type: method,
        url: url,
        data: $.parseJSON(data),
        dataType: "json",
        headers: {
          'x-access-token': token
        }
      })
      .done(function(data) {
        console.log('Response: ' + data);
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Error: ' + textStatus);
      });
  });

});
