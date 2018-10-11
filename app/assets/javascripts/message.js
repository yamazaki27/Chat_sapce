$(function(){
  function buildHTML(message){
      if (message.text != null && message.image_url != null) {
        body =  `<p class="lower-message__text">${message.text}</p>
                <img class="lower-message__image" src="${message.image_url}">`;
      } else if (message.image_url == null) {
        body =  `<p class="lower-message__text">${message.text}</p>`;
      } else if (message.text == null) {
        body =  `<img class: "lower-message__image" src="${message.image_url}">`;
      }

    var html = `<div class="chat-main__body--messages-list" data-message-id="${message.id}">
                  <div class="chat-main__message.clearfix">
                    <div class="chat-main__message-name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__message-time">
                      ${message.time}
                    </div>
                    <div class="chat-main__message-body">
                    ${body}
                    </div>
                  </div>
               </div>`;
    return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action');
    $.ajax({
    url: href,
    type: 'POST',
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__body").append(html);
      $(".form__message").val("");
      $(".form__mask__image").val("");
      $('.chat-main__body').animate({scrollTop: 99999}, 500, 'swing')
    })
    .fail(function() {
      alert("error!");
    })
    .always(function(){
        $('.form__submit').prop('disabled', false);
    })
  });

  var interval = setInterval(function() {
  var last_message_id = $('.chat-main__body--messages-list:last').data('message-id');
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: window.location.href,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(json) {
      var insertHTML = '';
      json.forEach(function(message) {
        if (message.id > last_message_id) {
          insertHTML += buildHTML(message);
          $('.chat-main__body').append(insertHTML);
          $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 500, 'swing')
        }
      });

    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
  }} , 5000 );
});
