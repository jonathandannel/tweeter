$(document).ready(function() {

  /* Decrement character limit as user types their new tweet */
  $('#user-input').on('keyup', function (e) {
    currentLength = e.target.value.length;
    let counter = $(this).siblings('.counter');
    $(counter).text(140 - currentLength);
    currentLength > 140 ? $(counter).css('color', 'red') : $(counter).css('color', 'black');
  });

});
