const Objmessage = {
  message: [
    {text: "Hello"},
    {text: "How are you"}
  ],
  other_message: [
    {text: "I'm fine!"},
    {text: "Thanks!"},
    {text: "And you?"}
  ]
}
const url = "http://emilcarlsson.se/assets/mikeross.png";
const other_url = "http://emilcarlsson.se/assets/harveyspecter.png";
const messagesUl = $("#messages");

Objmessage.message.forEach(item =>{
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');

  $(li).attr('class', "sent");
  $(img).attr('src',url);
  $(p).append(item.text);
  $(messagesUl).append($(li).append(img).append(p));
})

Objmessage.other_message.forEach(item =>{
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');

  $(li).attr('class', "replies");
  $(img).attr('src',other_url);
  $(p).append(item.text);
  $(messagesUl).append($(li).append(img).append(p));
})

$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
  $("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
  $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
  $("#profile-img").removeClass();
  $("#status-online").removeClass("active");
  $("#status-away").removeClass("active");
  $("#status-busy").removeClass("active");
  $("#status-offline").removeClass("active");
  $(this).addClass("active");
  
  if($("#status-online").hasClass("active")) {
    $("#profile-img").addClass("online");
  } else if ($("#status-away").hasClass("active")) {
    $("#profile-img").addClass("away");
  } else if ($("#status-busy").hasClass("active")) {
    $("#profile-img").addClass("busy");
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline");
  } else {
    $("#profile-img").removeClass();
  };
  
  $("#status-options").removeClass("active");
});

function newMessage() {
  message = $(".message-input input").val();
  if($.trim(message) == '') {
    return false;
  }
  $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
  $('.message-input input').val(null);
  $('.contact.active .preview').html('<span>You: </span>' + message);
  $(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$('.submit').click(function(e) {
  e.preventDefault();
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});
// //# sourceURL=pen.js