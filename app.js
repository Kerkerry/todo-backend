import express from 'express'
import dotenv from 'dotenv'
import TodosRoutes from './routes/TodosRoutes.js'
import cors from 'cors'

dotenv.config({path:'config.env'})

const app=express()
app.use(express.json())
app.use(cors())
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`); 
})

app.use(TodosRoutes)