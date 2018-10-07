$(function(){
  function buildHTML(message){
    var input;
      if (message.text != null && message.image_url != null) {
        body =  `<p class="lower-message__text">${message.text}</p>
                <img class="lower-message__image" src="${message.image}">`;
      } else if (message.image_url == null) {
        body =  `<p class="lower-message__text">${message.text}</p>`;
      } else if (message.text == null) {
        body =  `<img class: "lower-message__image" src="${message.image_url}">`;
      }

    var html = `<div class="chat-main__body--messages-list">
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
     console.log(formData);
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
      $('.chat-main__body').animate({scrollTop: 0}, 500, 'swing')
    })
    .fail(function() {
      alert("error!");
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });
});
