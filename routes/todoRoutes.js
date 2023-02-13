const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

router.route('/').get(todosController.getAllTodos).post(todosController.createNewTodo);
router.route('/:id').get(todosController.getTodo).patch(todosController.updateTodo).delete(todosController.deleteTodo);

module.exports = router;
