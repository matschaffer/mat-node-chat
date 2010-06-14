var App = App || {};

App.config = {
  nick: null,
  id: null
};

App.onConnect = function (session) {
  if (session.error) {
    alert(session.error);
    showConnect();
    return;
  }
  App.config.nick = session.nick;
  App.config.id = session.id;
  App.showChat();
};

App.showConnect = function () {
  $('#connect').show();
  $('#loading').hide();
  $('#toolbar').hide();
  $('#nickInput').focus();
};

App.showLoad = function () {
  $('#connect').hide();
  $('#loading').show();
  $('#toolbar').hide();
};

App.showChat = function () {
  $('#connect').hide();
  $('#loading').hide();
  $('#toolbar').show();
};

$('#connectButton').live('click', function(e) {
      var nick = $('#nickInput').val();

      if (nick.length > 50) {
          alert('nick too long. 50 characters max');
          return false;
      
      } else if (/[^\w-]/.test(nick)) {
          alert('Bad character found. Only letters, numbers, _ and - are allowed');
          return false;
      
      } else if ($.trim(nick).length < 1) {
          alert('enter nick name');
          return false;
      }

      $.ajax({
        cache: false,
        type: 'GET',
        url: '/join',
        data: {
          nick: nick
        },
        error: function() { alert('Error connecting'); },
        success: App.onConnect
      });

      return false;
    });

$(function () {
    App.showConnect();
  });

