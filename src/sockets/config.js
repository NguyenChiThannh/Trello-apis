import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import { corsOptions } from '~/config/cors'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: corsOptions
})

const userSocketMap = {} // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ io.on ~ a user socket connected:', socket.id)

  const userId = socket.handshake.query.userId
  if (userId != 'undefined') userSocketMap[userId] = socket.id

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, io, server }
