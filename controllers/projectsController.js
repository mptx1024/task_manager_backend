const Project = require('../models/Project');
const mongoose = require('mongoose');

/**
 * @description Get all projects from a user
 * @route GET /api/v1/projects
 * @access Private
 */
const getAllProjects = async (req, res) => {
    const { uid } = req.user;
    const projects = await Project.find({ uid: uid });

    if (!projects?.length) {
        return res.status(404).json({ msg: `No projects found with uid ${uid}` });
    }
    res.status(200).json(projects);
};

/**
 * @description Create new projects
 * @route POST /api/v1/projects
 * @access Private
 */

const createNewProject = async (req, res) => {
    const { isAnonymous, uid } = req.user; // Injected from middleware verifyToken
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ msg: `No project title` });
    }

    let newProject;
    if (!isAnonymous) {
        newProject = await Project.create({ uid, title });
    } else {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 5); // 2880 mins === two days
        newProject = await Project.create({ uid, title, expireAt: date });
    }

    if (newProject) {
        return res.status(201).json({ msg: 'New Project has been created' });
    } else {
        return res.status(400).json({ msg: 'Invalid project data' });
    }
};

/**
 * @description Update projects
 * @route PATCH /api/v1/projects
 * @access Private
 */

const updateProject = async (req, res) => {
    const { _id: projectId, title } = req.body;

    // findById(): Finds a single document by its _id field
    const project = await Project.findById(projectId).exec();
    if (!project) {
        return res.status(400).json({ message: 'Project not found' });
    }
    if (!title) {
        return res.status(400).json({ msg: `No title` });
    }
    project.title = title;
    const updatedProject = await project.save();

    return res.status(200).json({ msg: `Project updated. id: ${updatedProject._id}` });
};

/**
 * @description Delete projects
 * @route DELETE /api/v1/projects
 * @access Private
 */

const deleteProject = async (req, res) => {
    const { _id: projectId } = req.body;
    // console.log('🚀 ~ file: projectsController.js:72 ~ deleteProject ~ req.body', req.body);

    if (!projectId) {
        return res.status(400).json({ msg: 'ProjectId required' });
    }

    const project = await Project.findById(projectId).exec();
    if (!project) {
        return res.status(400).json({ msg: 'Project not found' });
    }

    const result = await project.deleteOne();
    res.json({ msg: `Project with ID ${result._id} has been deleted` });
};

module.exports = {
    createNewProject,
    getAllProjects,
    updateProject,
    deleteProject,
};
