const Todo = require('../models/Todo');
const mongoose = require('mongoose');

/**
 * @description Get all todos from a user
 * @route GET /api/v1/todos
 * @access Private
 */
const getAllTodos = async (req, res) => {
    const { uid } = req.user;
    // console.log(' in getAllTodos');
    const todos = await Todo.find({ uid: uid });
    // console.log('🚀 ~ file: todosController.js:14 ~ getAllTodos ~ todos', todos);

    if (!todos?.length) {
        return res.status(200).json({ msg: `No todos found with uid ${uid}` });
    }
    res.status(200).json(todos);
};

/**
 * @description Create new todos
 * @route POST /api/v1/todos
 * @access Private
 */
const createNewTodo = async (req, res) => {
    const { isAnonymous } = req.user; // Injected from middleware verifyToken
    const { uid, title } = req.body;

    if (!uid || !title) {
        return res.status(400).json({ msg: `No uid or title` });
    }
    let newTodo;
    if (!isAnonymous) {
        newTodo = await Todo.create({ uid: uid, title: title });
    } else {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 5); // 2880 mins === two days
        newTodo = await Todo.create({ uid: uid, title: title, expireAt: date });
    }

    if (newTodo) {
        return res.status(201).json({ msg: 'New todo has been created' });
    } else {
        return res.status(400).json({ msg: 'Invalid todo data' });
    }
};

/**
 * @description Update todos
 * @route PATCH /api/v1/todos
 * @access Private
 */

const updateTodo = async (req, res) => {
    const { uid, _id: todoId, title, completed } = req.body;

    // findById(): Finds a single document by its _id field
    const todo = await Todo.findById(todoId).exec();
    if (!todo) {
        return res.status(400).json({ message: 'Todo not found' });
    }

    todo.title = title;
    todo.completed = completed;
    const updatedTodo = await todo.save();

    return res.status(200).json({ msg: `Todo updated. id: ${updatedTodo._id}` });
    // return res.status(200).json({ msg: `Todo updated` });
};

/**
 * @description Delete todos
 * @route DELETE /api/v1/todos
 * @access Private
 */

const deleteTodo = async (req, res) => {
    const { _id: todoId } = req.body;
    // console.log('🚀 ~ file: todosController.js:72 ~ deleteTodo ~ req.body', req.body);

    if (!todoId) {
        return res.status(400).json({ msg: 'TodoId required' });
    }
    const todo = await Todo.findById(todoId).exec();
    if (!todo) {
        return res.status(400).json({ msg: 'Todo not found' });
    }
    const result = await todo.deleteOne();
    res.json({ msg: `Todo with ID ${result._id} has been deleted` });
};

module.exports = {
    createNewTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
};
