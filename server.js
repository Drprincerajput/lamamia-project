// importing modules

const express = require("express");
const http = require("http");

// our express app with name app 

const app = express();

// creating server for our app

const server = http.createServer(app);
const socket = require("socket.io");

// socket working on server we have created

const io = socket(server);

// basic object or say room collection for users id

const rooms = {};

// this on event will fire when person will connect to our socket server

io.on("connection", socket => {

    // join room will fire from client side

    socket.on("join room", roomID => {

        // if room id exists then push to array
        // if new created then new array


        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }

        // notifying other or existing user new user arrival and leting know new user there is a user already

        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    // telling other user who am i and what i want
    // payload consist all the data regarding that info

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    // sending back data to user who offer same as above

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    // it's kinda like two person aggreeing upon connection
    // low level networking

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
});

// to run server on a port we define 8000 and checking it by logging it to console
server.listen(8000, () => console.log('server is running on port 8000'));