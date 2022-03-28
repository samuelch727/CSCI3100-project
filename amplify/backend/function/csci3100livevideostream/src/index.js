/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const express = require('express')
    const app = express()
    const server = require('http').Server(app)
    const io = require('socket.io')(server)
    const { ExpressPeerServer } = require('peer');
    const peerServer = ExpressPeerServer(server, {
        debug: true
    });
    const {v4:uuidV4} = require('uuid')



    app.use('/peerjs', peerServer)
    
    app.set('view engine', 'ejs')
    // app.use(express.static('public'))
    app.use(express.json())    
    app.get('/', (req, res) =>{
        //res.redirect(`/${uuidV4()}`)
        console.log(req.body);
        if (!req.body?.test) {
            console.log("nothing")
            res.status(400).json({message:"nothing  "})
            return
        }
        res.status(200).json({dwahgf :"yo"})
    })
    
    app.get('/:room', (req, res) =>{
        res.json({test: req.body})
        // res.render('room', {roomId: req.params.room})
    })
    
    io.on('connection', socket =>{
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId)
            socket.to(roomId).broadcast.emit('user-connected', userId);
            socket.on('message',(message) => {
                io.to(roomId).emit('createMessage', message)
            })
            socket.on('disconnect', () => {
                socket.to(roomId).broadcast.emit('user-disconnected', userId)
            })
        })
    })
    

server.listen(process.env.PORT||3030, () =>{
    console.log("Server is connecting on port 3030:");
});