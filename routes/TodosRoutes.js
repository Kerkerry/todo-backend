import express from 'express'
import TodosControllers from '../controllers/TodosControllers.js'
const Router=express.Router()

Router.get('/',TodosControllers.getTodos)
Router.put('/update-todo/:id',TodosControllers.updateTodo)
Router.put('/toggle-todo/:id',TodosControllers.toggleTodo)
Router.post('/add-todo',TodosControllers.AddTodo)
Router.delete('/delete-todo/:id',TodosControllers.deleteTodo)

export default Router