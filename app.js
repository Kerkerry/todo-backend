import express from 'express'
import dotenv from 'dotenv'
import TodosRoutes from './routes/TodosRoutes.js' // Import the function
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
dotenv.config({path:'config.env'})

const app = express()
app.use(express.json())

// Configure CORS for Express API routes (like /signin)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})

// Call the imported function with the 'io' instance to get the configured router
app.use(TodosRoutes(io))

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`); 
})