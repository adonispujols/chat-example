// set up express server
var app = require('express')();
var http = require('http').Server(app);   // Are we using HTTPS?
// connect socket.io to express/http server.
var io = require('socket.io')(http);


// serving initial files from server to client (upon request/site load, via express)
// (dynamic/non-static site, so files *must* be served)
app.get('/', function(req, res){          // GET okay here (just serving html)?
    // serve index
    res.sendFile(__dirname + '/index.html');
});

// on client connect, do actions and register .on event handlers for clients events
io.on('connection', function(socket){
    /* SAME FOR THE OTHER EVENTS

    // RENAME COMMENT TO BE MORE DESCRIPTIVE?
    // ^,e.g.,
    // when message is sent
    // on message sent, blah blah
    // ^"sent" from perspective of user (which is what really matters, anyways)
    // on 'chat message' event, recieve and print message

    */
    socket.on('chat message', function(msg){
        // emit chat message to all clients (and self)
        // NOTE: DOESN'T HAVE TO BE SAME NAME
        // SWITCH NAME TO STOP CONFUSION (send/receive)
        io.emit('chat message1', msg);

        // log message
        console.log('message: ' + msg);
    });

    console.log('a user connected');  // logs (prints) to node.js server/terminal

    // on client disconnect, do x
    socket.on('disconnect', function(){
        console.log('user disconnected')
    });
});

// http server listens to certain port (via express)
http.listen(3000, function(){
    console.log('listening on *:3000');  // log upon starting
});
