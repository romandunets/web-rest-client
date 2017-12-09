$(document).ready(function() {
  
  $('#request-form').submit(function(e) {
    e.preventDefault(e);

    var requestForm = $('#request-form');
    var method = requestForm.find('select[name="method"]').val();
    var url = requestForm.find('input[name="url"]').val();
    var data = requestForm.find('textarea[name="data"]').val();
    var jsonData = data !== "" ? $.parseJSON(data) : {};

    var headers = {};
    for (var i = 1; i <= 5; i++) {
      var headerName = requestForm.find('input[name="header-name-' + i + '"]').val();
      var headerValue = requestForm.find('input[name="header-value-' + i + '"]').val();
      if (headerName !== "" && headerValue !== "") {
        headers[headerName] = headerValue;
      }
    }

    console.log('Sending ' + method + ' request to ' + url);

    $.ajax({
        type: method,
        url: url,
        data: jsonData,
        dataType: "json",
        headers: headers
      })
      .done(function(data) {
        console.log('Response: ' + data);
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Error: ' + textStatus);
      });
  });

});
