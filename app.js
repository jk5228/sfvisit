$(document).ready(function() {

  // Load images
  $.get('images.json', function(data) {
    for (var i = 0; i < data.length; i++) {
      var image = $('<div class="image"></div>');
      image.css('background-image', 'url("' + data[i].src + '")');
      $('body').append(image);
    }
  });

  // Open modal
  $('body').click(function(e) {
    var target = $(e.target);
    $('#modal')
      .css('background-image', target.css('background-image'))
      .removeClass('hide');
    $('body').css('overflow', 'hidden');
  });

  // Close modal
  $('#close').click(function(e) {
    $('#modal').addClass('hide');
    $('body').css('overflow', 'scroll');

  });

  // Stop clicks from propagating past modal
  $('#modal').click(function(e) {
    e.stopPropagation();
  });

  $('body').keydown(function(e) {
    if (e.keyCode === 27) {
      $('#modal').addClass('hide');
      $('body').css('overflow', 'scroll');
    }
  });

});