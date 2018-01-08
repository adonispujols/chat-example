<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Private Chat</title>
    <!-- MAY HAVE TO SERVE CSS, TOO?? (look at chat example for help) -->
    <!-- <link rel="stylesheet" href="style.css"> -->
    <style>
        /* the asterisk affects all elements */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font: 13px Helvetica, Arial;
        }
        form {
            background: #000;
            padding: 3px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        form input {
            border: 0;
            padding: 10px;
            width: 90%;
            margin-right: .5%;
        }
        form button {
            width: 9%;
            background: rgb(130, 224, 255);
            border: none;
            padding: 10px; 
        }
        #messages {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }
        #messages li {
            padding: 5px 10px;
        }
        #messages li:nth-child(odd) {
            background: #eee;
        }
    </style>
</head>
<body>
    <p style="font-size: 50px;">Hello, 世界!</p>
    <!-- holds list of messages -->
    <ul id="messages"></ul>
    <!-- removed action="" to comply with HTML5 (may pose security risks) -->
    <!-- "return false" to avoid refresh & sending form data -->
    <form onSubmit="return false">
        <input id="m" autocomplete="off"/> <!-- holds input -->
        <button>Send</button>
    </form>
    <!-- loading scripts here to quicken loading time-->
    <!-- DOWNLOAD scripts -->
    <!-- MAY NEED TO DO FUNKY STUFF TO LOAD LOCALLY?? -->
    <script src= "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <!-- jquery speeds up HTML interaction/scripting -->
    <script src= "https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script>
        $(function () {
            // set up socket.io on client
            var socket = io();

            // when form is submitted
            $('form').submit(function(){
                // emit message value to server as 'chat message' event
                socket.emit('chat message', $('#m').val());

                // clear input field (empty string)
                $('#m').val('');
            });

            // on 'chat message', recieve message
            socket.on('chat message1', function(msg){
                // test to show how to print to client console
                // (otherwise, if done in server-side script, it prints to server terminal)
                console.log(msg);
                // add message as text to list
                $('#messages').append($('<li>').text(msg));
            });
        });
    </script>
</body>
</html>
