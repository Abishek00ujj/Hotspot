const exp = require('constants');
const express =require('express');
const http=require('http');
const socketio=require("socket.io");
const cors=require('cors');
const { addUsers, removeUser,getUser } = require('./entity');

const app=express();
app.use(cors());
app.use(express.json());
const server=http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on('connect',(socket)=>{
    console.log("User connected!");

    socket.on('join',({name,room},callback)=>{
        const {user,error}=addUsers(socket.id,name,room);
        if(error)
        {
            callback(error);
            return;
        }
        console.log(user);
        
        socket.join(user.room);

        socket.emit('toastmessage',{user:'admin',text:`${user.name} joined`});
        socket.emit('message',{user:'admin',text:`${user.name} joined`});
        socket.broadcast.to(user.room).emit('toastmessage',{user:'admin',text:`${user.name} has joined`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`})
    });


    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id);
        if(user)
        {
           io.to(user.room).emit('message',{user:user.name,text:message});
        }
        else{
            callback("User not found");
        }
    });

     socket.on('disconnect',()=>{
    console.log("User disconnected!");
    const user=removeUser(socket.id);
    if(user)
    {
        io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
    }
})
})

server.listen(199,()=>{
    console.log("server is running in the port http://localhost:199");
});