var data, data2, head_array=[], body_array=[], footer_array=[];


$(document).ready(() => {
  genereatePages(17);

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

function genereatePages(amount) {
  var body = $('body');
  for (var i = 1; i <= amount; i++) {
    var div = $(`
  <div data-role="page" id="page${i}">
    <div data-role="header" data-position="fixed" class="header">
      <h1 class="header"></h1>
      <a href="#page${Math.max(1, i-1)}" class="ui-btn ui-btn-left ui-btn-icon-left ${i == 1 ? 'ui-disabled' : ''}">Forrige</a>
      <a href="#page${Math.min(amount, i+1)}" class="ui-btn ui-btn-right ui-btn-icon-right ${i == amount ? 'ui-disabled' : ''}">Næste</a>
    </div>
    <div data-role="content" class="content">Content Uno</div>
    <div data-role="footer" data-position="fixed">
      <h4 class="footer"></h4>
    </div>
  </div>
    `);
    div.appendTo( $.mobile.pageContainer );
    if (i == 1) $.mobile.changePage( div );
  }
}
