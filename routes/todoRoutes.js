const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todosController');

router
    .route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createNewTodo)
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo);

module.exports = router;
