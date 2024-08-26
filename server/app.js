import express from 'express';
import { Server } from 'socket.io';
import {createServer} from "http"
const port =3000;
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: { 
        origin: 'http://localhost:5173',  
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.get('/', (req, res) => {
    res.send('Welcome');
});
io.on('connection',(socket)=>{
    console.log("user connected",socket.id);

    socket.on('message',({ room, message })=>{
        console.log({ room, message });
        socket.to(room).emit('receive-message',message)
    });
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
      });
    // socket.emit("welcome", `my name is prakshal,${socket.id}`)
    // socket.broadcast.emit("welcome", `join this user,${socket.id}`)
    socket.on('disconnect',()=>{
        console.log("user disconnected",socket.id);
    })

})
server.listen(port,()=>{
    console.log("server is start ")
});