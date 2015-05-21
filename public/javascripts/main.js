var socket = io();

//socket.emit('username', window.prompt('What\'s your username'));
/*
$('#login').submit(function(){
  socket.emit('username', $('#usr').val());
  return true;
});*/

$('#messages').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});


socket.emit('username', $('#loggedusr').val());


socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('chat event', function(msg){
   console.log(msg);
   $('#messages').append($('<li>').addClass('event').text(msg));
});