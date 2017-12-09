$(document).ready(function() {
  
  $('#request-form').submit(function(e) {
    e.preventDefault(e);

    var requestForm = $('#request-form');
    var method = requestForm.find('select[name="method"]').val();
    var url = requestForm.find('input[name="url"]').val();
    var dataType = requestForm.find('select[name="data-type"]').val();
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
        dataType: dataType,
        headers: headers
      })
      .done(function(response) {
        $("#response").text(JSON.stringify(response));
      })
      .fail(function(jqXHR, textStatus) {
        $("#response").text('Error: ' + textStatus);
      });
  });

});
