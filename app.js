import express from 'express'
import dotenv from 'dotenv'
import TodosRoutes from './routes/TodosRoutes.js'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
dotenv.config({path:'config.env'})

const app=express()
app.use(cors())
// const server=http.createServer(app)

// const io=new Server(
//     server,
//     {
//         cors:{
//             origin:'http://localhost:3100',
//             methods:['GET','POST']
//         }
//     }
// )

// io.on(
//     'connection',
//     (socket)=>{
//         console.log('A user connected')

//         socket.on('disconnect',()=>{
//             console.log("User disconnected");
//         })
//     }
// )

// server.use(express.json())
// server.listen(process.env.PORT, ()=>{
//     console.log(`Listening on port ${process.env.PORT}`); 
// })

app.use(express.json())
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`); 
})


app.use(TodosRoutes)