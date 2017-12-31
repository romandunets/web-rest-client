$(document).ready(function() {
  
  $('#requestForm').submit(function(e) {
    e.preventDefault(e);

    var requestForm = $('#requestForm');
    var method = requestForm.find('#methodSelect').val();
    var url = requestForm.find('#urlInput').val();
    var data = requestForm.find('#dataTextArea').val();
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
        headers: headers
      })
      .done(function(response) {
        $("#response").html(prettifyJSON(response));
        $("#responseStatus").text('200 OK');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        $("#response").html(prettifyJSON(JSON.parse(jqXHR.responseText)));
        $("#responseStatus").text(jqXHR.status + ' ' + jqXHR.statusText);
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

  function prettifyJSON(json) {
    return JSON.stringify(json, undefined, 4)
      .replace(/\n/g,'<br/>')
      .replace(/\s/g,'&nbsp;');
  }

});
