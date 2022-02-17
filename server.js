const express = require('express')
const app = express();

// creation un serveur express http 
const server = require('http').createServer(app) 
const io = require('socket.io')(server)

app.set('views', 'Views')
app.use(express.static('Views'))


app.get('/', (req,res) =>{
    return res.render('index.html')
} )

//connection ouvert entre le client et le serveur
io.on('connection',socket => {
    socket.on('send-message', data =>{       
    io.sockets.emit('send-message', data)
    socket.broadcast.emit('send-message', data)
    // envoyer un message à tous les clients connectés
    })

    // console.log('Websocket connection open');
    // console.log(socket);
    // socket.on('message', data => {
    //     console.log(data);
    //})
    // envoyer data vers client
    // socket.emit('test', {name:'test'})
})


server.listen(5000)