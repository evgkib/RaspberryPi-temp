var http = require('http');
var fs = require('fs');
var count = 0;

var server = http.createServer(function(req,res){
    fs.readFile('./index.html', function(error, data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data, 'utf-8');
    });
}).listen(3000);

console.log('Server is running');

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('User connected');
    setInterval(function(){
    fs.readFile('/sys/bus/w1/devices/28-00000451e0e3/w1_slave', function(error, data){
        console.log(data.toString().substring(69)/1000);
        socket.emit('temperature',{number: data.toString().substring(69)/1000});
    });
    }, 1000);
});


