$(function(){
  function buildHTML(message){
    var input;
      if (message.text != null && message.image_url != null) {
        body = `<p class="lower-message__text">${message.text}</p>
                <img class="lower-message__image" src="${message.image}">`;
      } else if (message.image_url == null) {
        body = `<p class="lower-message__text">${message.text}</p>`;
      } else if (message.text == null) {
        body = `<img class: "lower-message__image" src="${message.image_url}">`;
      }

    var html = `<div class="chat-main__message">
                  <div class="chat-main__message">
                    <div class="chat-main__message-name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__message-time">
                      ${message.time}
                    </div>
                  </div>
                  <div class="chat-main__message-body">
                    ${body}
                  </div>
               </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    for(item of formData) {
      console.log(item);
    }
    var href = $(this).attr('action');
    console.log('success');
 $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.chat-main__body--messages-list').append(html);
      $('.form__message').val('');
      $('.form__mask__image').val('');
    })
    .fail(function(XMLHttpRequest, textStatus, errorThrown) {
      alert('error!!!');
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus : " + textStatus);
      console.log("errorThrown : " + errorThrown.message);
    });
  });
});
