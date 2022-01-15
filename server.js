const express = require('express');
const socketio = require("socket.io");
const path = require("path");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//set static folder
app.use(express.static(path.join(__dirname,"public")));
//run when client connects
io.on('connection',socket =>{
    //welcome user
    socket.emit("message",'welcome to chatcord');
    //brodcast when user connects
    socket.broadcast.emit('message',"a user has joined the chat ");
    // runs when user disconnect
    socket.on('disconnect',() =>{
        io.emit('message', "User left the chat")
    })
    io.emit();
    //listen for chatMessage
    socket.on('chatMessage',msg =>{
        io.emit('message',msg)
    })
    });
//listen for chatMessage

const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => console.log("server listing on ",PORT));