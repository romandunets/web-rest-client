$(document).ready(function() {
  
  $("form").submit(function(e) {
    e.preventDefault(e);

    var requestForm = $('#request-form');
    var method = requestForm.find('select[name="method"]').val();
    var url = requestForm.find('input[name="url"]').val();
    var token = requestForm.find('input[name="token"]').val();

    console.log('Sending ' + method + ' request to ' + url);

    $.ajax({
        type: method,
        url: url,
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
