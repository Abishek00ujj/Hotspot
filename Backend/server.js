const express=require('express');

const http=require("http");

const socketio=require("socket.io");


const cors=require('cors');


const app=express();

const server=http.createServer(app);


server.listen("1992",()=>{
     console.log("Server is Active now! and working now. (Socket is active)!");
});
