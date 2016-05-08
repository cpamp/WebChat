var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/css'));

app.get("/", function(req, res){
    res.sendFile("/index.html", {"root": __dirname});
});

io.on("connection", function(socket){
    console.log("A user has connected.");
    io.emit("system message", "System: A user has connected.")
    socket.on("disconnect", function(){
        console.log("A user has disconnected");
        io.emit("system message", "System: A user has disconnected.")
    });
    
    socket.on("chat message", function(msg){
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });
});

http.listen(3000, function(){
    console.log("listening on port 3000");
});