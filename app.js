$(document).ready(function() {

  var num = 0;
  var count = 0;

  // Load images
  $.get('images.json', function(data) {
    count = data.length;
    for (var i = 0; i < count; i++) {
      var image = $('<div class="image" data-num="' + i + '"></div>');
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
    num = target.attr('data-num');
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
    switch (e.keyCode) {
      case 27:
        $('#modal').addClass('hide');
        $('body').css('overflow', 'scroll');
        break;
      case 37:
        num = (count+num-1) % count;
        var image = $('.image[data-num="' + num + '"]');
        $('#modal').css('background-image', image.css('background-image'));
        break;
      case 39:
        num = (count+parseInt(num)+1) % count;
        var image = $('.image[data-num="' + num + '"]');
        $('#modal').css('background-image', image.css('background-image'));
        break;
    }
  });

});