num = 0;
count = 0;

function openModal(target) {
  $('#modal')
    .css('background-image', target.css('background-image'))
    .addClass('show');
  $('body').css('overflow', 'hidden');
}

function closeModal() {
  $('#modal').removeClass('show');
  $('body').css('overflow', 'scroll');
}

function moveLeft() {
  num = (count+num-1) % count;
  var image = $('.image[data-num="' + num + '"]');
  $('#modal').css('background-image', image.css('background-image'));
}

function moveRight() {
  num = (count+parseInt(num)+1) % count;
  var image = $('.image[data-num="' + num + '"]');
  $('#modal').css('background-image', image.css('background-image'));
}

$(document).ready(function() {

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
    openModal(target);
    num = target.attr('data-num');
  });

  // Handle clicks on modal
  $('#modal').click(function(e) {
    var target = $(e.target);
    switch (target[0].id) {
      case 'area-left':
        moveLeft();
        break;
      case 'area-center':
        closeModal();
        break;
      case 'area-right':
        moveRight();
        break;
    }
    e.stopPropagation();
  });

  // Handle clicks on body
  $('body').keydown(function(e) {
    switch (e.keyCode) {
      case 27:
        closeModal();
        break;
      case 37:
        moveLeft();
        break;
      case 39:
        moveRight();
        break;
    }
  });

});