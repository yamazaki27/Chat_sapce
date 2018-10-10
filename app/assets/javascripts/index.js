$(function(){

  var search_result = $("#user-search-result")
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.user_name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
               </div>`
    search_result.append(html)
  }

  function appendGroup(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    return html
  }

  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data:{ keyword: input },
      datatype: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $('#user-search-result').on('click', ".chat-group-user__btn", function(){
    var selectUser = {
      id: $(this).data('user-id'),
      name: $(this).data('user-name')
    }
    var html = appendGroup(selectUser)
    $('#chat-group-users').append(html)

    $(this).parent().remove();
  });

  $('#chat-group-users').on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
