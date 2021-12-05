console.log("Connection!");

let socket = io( 'http://localhost:8080');

$('#notify').on('click', function(event){
    event.preventDefault();
    socket.emit('notify');
});


socket.on('joined', function(data){
    let notification = `<p>${data} joined us!</ps>`
    $('.chatbox').append(notification);
});

socket.on('notification', function(data){
    let notification = `<p>${data} just triggered a notification!</p>`
    $('.chatbox').append(notification);
});

socket.on('left', function(data){
    let notification = `<p>${data} left us!</p>`
    $('.chatbox').append(notification);
});