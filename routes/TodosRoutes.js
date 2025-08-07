import express from 'express'
import TodosControllers from '../controllers/TodosControllers.js'
import AuthController from '../controllers/AuthController.js'

import { expressjwt } from "express-jwt";

const SECRET_KEY='todo-app-user-secret-key'

const token=expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] })


const Router=express.Router()

Router.get('/',token, TodosControllers.getTodos)
Router.post('/signup',AuthController.signup)
Router.post('/signin',AuthController.signin)
Router.put('/update-todo/:id',token,TodosControllers.updateTodo)
Router.put('/toggle-todo/:id',token,TodosControllers.toggleTodo)
Router.post('/add-todo',token,TodosControllers.AddTodo)
Router.delete('/delete-todo/:id',token,TodosControllers.deleteTodo)

export default Router