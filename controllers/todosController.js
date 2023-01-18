const Todo = require('../models/Todo');
const mongoose = require('mongoose');

/**
 * @description Get all todos from user
 * @route GET /api/v1/todos
 * @access Private
 */

const getAllTodos = async (req, res) => {
    const { uid } = req.user;
    const todos = Todo.find({ uid: uid });

    if (!todos) {
        return res.status(200).json({ msg: `No todo found for uid ${uid}` });
    }
    res.json(todos);
};

/**
 * @description Create new todos
 * @route POST /api/v1/todos
 * @access Private
 */

const createNewTodo = async (req, res) => {
    return res.status(200).json({ msg: 'Create new Todo' });
};

/**
 * @description Update todos
 * @route PATCH /api/v1/todos
 * @access Private
 */

const updateTodo = async (req, res) => {
    return res.status(200).json({ msg: 'update Todo' });
};

/**
 * @description Delete todos
 * @route DELETE /api/v1/todos
 * @access Private
 */

const deleteTodo = async (req, res) => {
    return res.status(200).json({ msg: 'delete Todo' });
};

module.exports = {
    createNewTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
};
