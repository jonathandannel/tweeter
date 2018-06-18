$(document).ready(function() {

  $('#user-input').on('keyup', function (e) {
    var currentLength = 0;
    currentLength = e.target.value.length;
    $(this).siblings('.counter').text(140 - currentLength);
    if (currentLength > 140) {
      $(this).siblings('.counter').css('color', 'red')
    }
    // alternatively: $(".counter").text(140 - currentLength);
  })
});
