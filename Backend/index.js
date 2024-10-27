// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const PORT = 3000;

// // Move the 'connection' event handler outside the server.listen callback
// io.on('connection', (socket) => {
//     console.log('A user connected');
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// app.get('/', (req, res) => {
//     io.emit('hey', '2222');
//     res.send('Server is running!');
// });

// server.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
// });

const express = require('express')
const app = express()
const PORT = 3000;


const http = require('http').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
    origin: 'http://192.168.43.104:2000'
})


let chatGroup = []
function createUniqMessageId() {
    return Math.random().toString(10).substring(10, 100)
}

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user is just connected `);

    socket.on('getAllGroup', () => {
        socket.emit('groupList', chatGroup)
    })

    socket.on('createNewgroup', (currentgroupname) => {
        console.log(currentgroupname);
        chatGroup.unshift({
            id: chatGroup.length + 1,
            currentgroupname,
            message: []
        })
        socket.emit('groupList', chatGroup)
    })

    socket.on('findGroup', (id) => {
        const filteredGroup = chatGroup.filter(item => item.id === id)
        socket.emit('foundGroup', filteredGroup[0].message)
    })
    
    socket.on('NewChatMessage', (data) => {
        let { currentChatmessage, groupIdentifier, currentuser, timeData } = data;
        const filteredGroup = chatGroup.filter(item => item.id === groupIdentifier)
        const newMessage = {
            id: createUniqMessageId(),
            text: currentChatmessage,
            currentuser,
            time: `${timeData.hr}:${timeData.min}`

        }
        socket.to(filteredGroup[0].currentgroupname).emit('groupMessage', newMessage)
        filteredGroup[0].message.push(newMessage)
        socket.emit('groupList',chatGroup)
        socket.emit('foundGroup',filteredGroup[0].message)
    })



})


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json(chatGroup)
});

http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
