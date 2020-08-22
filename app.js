const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require("body-parser");
require('dotenv/config');
const http=require('http').createServer(app)
const path  = require('path');
var io = require('socket.io')(http);

//BODY PARSER JSON
app.use(bodyParser.json());

//STATIC FILE
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    
});

app.use("/public", express.static(path.join(__dirname, 'public')));

//WEBSOCKET CONNECTION
io.on('connection', (socket) => {

    console.log('a user connected')

    socket.emit('chat message', 'catdawey ');

    io.emit('chat message', 'SALAM!');

    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

    socket.on('chat',function(data){
        io.sockets.emit('chat',data)  
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })
    socket.broadcast.emit("online"," cata qosuldu")
    
  });
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });


//JSON EXPRESS
app.use(express.json());




//IMPORT ROUTERS
const postsRoute =require('./routes/posts');
const messageRoute=require('./routes/messages');

//MIDDLEWARE
app.use('/posts',postsRoute,);
app.use('/messages',messageRoute)


//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    
    },
    // () =>
    // console.log("qosuldu")
);


//ROUTES
app.get('/',(req,res) => {res.send("salam aleykum")});


//HOW TO LISTEN PORT
const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log('listening on *:3000');
    console.log(`http://localhost:3000/index`)
  });