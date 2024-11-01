const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: 'http://10.10.10.117:8081',
    methods: ['GET', 'POST'],
  },
})

app.use(cors())

io.on('connection', (socket) => {
  console.log('Novo usuário conectado')

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg)
  })

  socket.on('disconnect', () => {
    console.log('Usuário desconectado')
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
