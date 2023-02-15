const Todo = require('../models/Todo');
const Project = require('../models/Project');
const mongoose = require('mongoose');
const expireTime = require('../config/anonymousDataExpireTime');

/**
 * @description Get all todos from a user
 * @route GET /api/v1/todos
 * @access Private
 */

const getAllTodos = async (req, res) => {
    const { uid } = req.user;

    const todos = await Todo.find({ uid: uid });
    // console.log('🚀 ~ file: todosController.js:17 ~ getAllTodos ~ todos', todos);

    if (!todos?.length) {
        console.log('in todosController: No todo found');
        return res.status(204).json({ msg: `No todos found with uid ${uid}` });
    }
    res.status(200).json(todos);
};

/**
 * @description Get one todo
 * @route GET /api/v1/todos/:id
 * @access Private
 */

const getTodo = async (req, res) => {
    const {
        user: { uid },
        params: { id: todoId },
    } = req;

    const todo = await Todo.findOne({ uid: uid, _id: todoId });
    res.status(200).json(todo);
};

/**
 * @description Create new todos
 * @route POST /api/v1/todos
 * @access Private
 */
const createNewTodo = async (req, res) => {
    const { isAnonymous, uid } = req.user; // Injected from middleware verifyToken
    const { title, dueDate, projectId, priority } = req.body;

    if (!title.trim()) {
        return res.status(400).json({ msg: `No todo title` });
    }

    const newTodo = await Todo.create({
        uid,
        title,
        dueDate,
        projectId,
        priority,
        expireAt: isAnonymous ? expireTime() : null,
    });

    if (projectId) {
        await Project.updateOne({ _id: projectId }, { $addToSet: { todoList: newTodo._id } });
    }
    return res.status(201).json(newTodo);

    // if (newTodo) {
    //     return res.status(201).json({ msg: 'New todo has been created' });
    // } else {
    //     return res.status(400).json({ msg: 'Invalid todo data' });
    // }
};

/**
 * @description Update todos
 * @route PATCH /api/v1/todos
 * @access Private
 */

const updateTodo = async (req, res) => {
    const {
        body: { title, completed, projectId, dueDate, description, priority },
        user: { uid },
        params: { id: todoId },
    } = req;

    if (!title) {
        return res.status(400).json({ msg: `No todo title` });
    }
    if (!uid) {
        return res.status(400).json({ msg: `No uid` });
    }

    // findById(): Finds a single document by its _id field
    // const todo = await Todo.findById(todoId).exec();
    const todo = await Todo.findByIdAndUpdate({ _id: todoId, uid: uid }, req.body, { new: true, runValidators: true });

    if (!todo) {
        return res.status(400).json({ message: 'Todo not found' });
    }

    if (projectId && todo.projectId !== projectId) {
        await Project.updateOne({ _id: projectId, uid: uid }, { $addToSet: { todoList: todo._id } });
        todo.projectId = projectId;
    }

    // todo.title = title;
    // todo.completed = completed;
    // todo.projectId = projectId;
    // todo.dueDate = dueDate;
    // todo.description = description;
    // todo.priority = priority;
    // const updatedTodo = await todo.save();

    // return res.status(200).json({ msg: `Todo updated. id: ${todo._id}` });
    return res.status(200).json({ todo });
    // return res.status(200).json({ msg: `Todo updated` });
};

/**
 * @description Delete todos
 * @route DELETE /api/v1/todos
 * @access Private
 */

const deleteTodo = async (req, res) => {
    const {
        user: { uid },
        params: { id: todoId },
    } = req;

    if (!todoId) {
        return res.status(400).json({ msg: 'TodoId required' });
    }
    if (!uid) {
        return res.status(400).json({ msg: `No uid` });
    }
    // const todo = await Todo.findById(todoId).exec();
    const deletedTodo = await Todo.findByIdAndDelete({ _id: todoId, uid: uid });

    if (!deletedTodo) {
        return res.status(400).json({ msg: 'Todo not found' });
    }

    // Remove todo reference in project's todoList

    // if (todo.projectId) {
    //     const project = await Project.findById(todo.projectId).exec();
    //     const updatedProjectTodoList = project?.todoList.filter((todoId) => {
    //         if (!todoId.equals(todo._id)) return todoId;
    //     });
    //     await Project.updateOne({ _id: todo.projectId }, { $set: { todoList: updatedProjectTodoList } });
    // }

    // const result = await todo.deleteOne();
    res.status(200).json({ msg: `Todo has been deleted` });
};

module.exports = {
    createNewTodo,
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo,
};
