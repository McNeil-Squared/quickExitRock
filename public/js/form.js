$(document).ready(function() {
  $('#formSubmission').hide();

  $('#topMargin').submit(function(event) {
    event.preventDefault();
    $.post( "/send", $('#topMargin').serialize(), function(data) {
      $('#formSubmission').show();
      $('#formSubmission').text(data);
    });
  });

});