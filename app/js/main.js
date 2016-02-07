var data, data2, head_array=[], body_array=[], footer_array=[];

$(document).ready(() => {
  $.ajax({
    url: 'json/content.json',
    success: contentCallback
  });

  $('.ui-btn').click(function () {
    var number = $(this).attr('href').slice(5);
    contentF(number);
  });
});

function contentF(curId) {
  var img = $('<img/>');
  img.attr('src', `grafik/step${curId}.jpg`);
  $('.content').html(img);

  $(`#page${curId} h1.header`).html(head_array[curId-1]);
  $(`#page${curId} h4.header`).html(footer_array[curId-1]);
}

function contentCallback (result) {
  $.each(result.slide, (i, obj) => {
    head_array[i] = obj.head;
    body_array[i] = obj.body;
    footer_array[i] = obj.footer;
  });
  var startNumber = window.location.hash.slice(5);
  contentF(startNumber || 1);
}
