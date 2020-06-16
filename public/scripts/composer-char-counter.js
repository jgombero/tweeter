const MAX_CHAR_LENGTH = require('./constants');

$(document).ready(function() {

  const $textarea = $('#tweet-text');

  $textarea.on('input', function(event) {
    const userTextLength = $(this).val().length;
    const counter = $(this).closest('form').find('.counter');
    const value = MAX_CHAR_LENGTH - userTextLength;

    counter.val(value);

    if (value < 0) {
      $(counter)[0].style.color = 'red';
    } else {
      $(counter)[0].style.color = '#545149';
    }
  });
});