$(document).ready(function() {

  $('#user-input').on('keyup', function (e) {
    var currentLength = 0;
    currentLength = e.target.value.length;
    $(this).siblings('.counter').text(140 - currentLength);
    // alternatively: $(".counter").text(140 - currentLength);
  })
});
