//Imports
const express = require('express');
const app = express();

//Server
//const server = app.listen(8080, function(){
//    console.log('Server with socket.io')
//})
const server = app.listen(8080);

//Config 
app.use(express.static(__dirname + "/static"));
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

//Sockets
const io = require('socket.io')(server)

io.on("connection", function (socket) {
    console.log("Someone connected!");
    io.sockets.emit('joined', socket.id);
    
    socket.on("notify", function () {
        io.sockets.emit('notification', socket.id);
    });

    socket.on("disconnect", function(){
		io.emit("left", socket.id)
	})
});

io.off("connection", function (socket) {
    io.sockets.emit('left', socket.id);
});


//Routes
app.get('/', function( request, response ){
	response.render( 'index' ); 
});
