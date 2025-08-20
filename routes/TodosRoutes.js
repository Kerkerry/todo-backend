import express from 'express'
import TodosControllers from '../controllers/TodosControllers.js'
import AuthController from '../controllers/AuthController.js'
import { expressjwt } from "express-jwt";

export default (io) => {
    const SECRET_KEY = 'todo-app-user-secret-key'
    const token = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] })
    const Router = express.Router()

    // Correctly pass the function reference. Express will provide req, res.
    Router.get('/', token, TodosControllers.getTodos)
    
    Router.post('/signup', AuthController.signup)
    Router.post('/signin', AuthController.signin)

    // Wrap the controller functions that need the 'io' object
    Router.put('/update-todo/:id', token, (req, res) => TodosControllers.updateTodo(io, req, res))
    Router.put('/toggle-todo', token, (req, res) => TodosControllers.toggleTodo(io, req, res))
    Router.post('/add-todo', token, (req, res) => TodosControllers.AddTodo(io, req, res))
    Router.delete('/delete-todo/:id', token, (req, res) => TodosControllers.deleteTodo(io, req, res))
    
    return Router
}