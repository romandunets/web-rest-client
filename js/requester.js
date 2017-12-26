$(document).ready(function() {
  
  $('#requestForm').submit(function(e) {
    e.preventDefault(e);

    var requestForm = $('#requestForm');
    var method = requestForm.find('#methodSelect').val();
    var url = requestForm.find('#urlInput').val();
    var dataType = requestForm.find('#dataTypeSelect').val();
    var data = requestForm.find('#dataTextArea').val();
    console.log(data);
    var jsonData = data !== "" ? $.parseJSON(data) : {};

    var headers = {};
    var headersCounter = parseInt($('#headersCounter').val());

    for (var i = 1; i <= headersCounter; i++) {
      var headerName = requestForm.find('#headerNameInput' + i).val();
      var headerValue = requestForm.find('#headerValueInput' + i).val();
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

  $('#addHeaderButton').click(function() {
    var headersCounter = parseInt($('#headersCounter').val());
    headersCounter++;

    var headerNameInput = $("<input>")
      .attr('type', 'text')
      .attr('placeholder', 'Authorization')
      .attr('id', 'headerNameInput' + headersCounter)
      .attr('class', 'form-control col-md-6');

    var headerNameFormGroup = $("<div></div>")
      .attr('class', 'form-group col-md-6')
      .append(headerNameInput);

    var headerValueInput = $("<input>")
      .attr('type', 'text')
      .attr('placeholder', 'Bearer XYZ')
      .attr('id', 'headerValueInput' + headersCounter)
      .attr('class', 'form-control col-md-6');
    var headerValueFormGroup = $("<div></div>")
      .attr('class', 'form-group col-md-6')
      .append(headerValueInput);

    var headerFormGroup = $("<div></div>")
      .attr('class', 'form-row')
      .append(headerNameFormGroup)
      .append(headerValueFormGroup);
      console.log(headerFormGroup);

    $('#addHeaderButton').closest('.form-row').before(headerFormGroup);
    $('#headersCounter').val(headersCounter);
  });

});
