require('./styles.css');
var socket = require('socket.io-client')();
var $ = require('jquery');

$('form').submit(function(){
	var message = $('#m').val();
	var time = new Date().toString().split(' ')[4];
	var logMessage = time + ': ' + message; 
	
	var chatMsg = $('<li>').text(logMessage);
	$('#messages').append(chatMsg);

	socket.emit('message', message);
	$('#m').val('');
	//return false to nullify the form submit
	return false;
});

socket.on('message', function(msg){
	var chatMsg = $('<li>').text(msg);
	$('#messages').append(chatMsg);
});