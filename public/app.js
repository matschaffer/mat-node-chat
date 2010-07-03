$(function() {
  var chatter,
      Chatter = function (name) {
        var client = new Faye.Client(),
            chat = "/chat",
            join = "/join";

        this.chat = function (message) {
          client.publish(chat, {
            name:    name,
            message: message
          });
        };

        client.subscribe(chat, function (incoming) {
          $("<p><span class='name'>" + incoming.name + ":</span> " + incoming.message + "</p>").appendTo("#messages");
        });

        client.subscribe(join, function (name) {
          $("<p class='join'>" + name + " has joined the room</p>").appendTo("#messages");
        });

        client.publish(join, name);
      };

  $("#send").submit(function() {
    var messageBox = $("#message");

    chatter.chat(messageBox.val());
    messageBox.val("");

    return false;
  });

  $("#join").submit(function() {
    var name = $("#name").val();

    if (name.length > 0) {
      chatter = new Chatter(name);
      $('#name-section').hide();
      $('#message-section').show();
      $('#message').focus();
    } else {
      $(this).find(".errors").text("Please enter a name.");
    }

    return false;
  });

  $("#name").focus();

});
