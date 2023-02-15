const Project = require('../models/Project');
const mongoose = require('mongoose');
const expireTime = require('../config/anonymousDataExpireTime');

/**
 * @description Get all projects from a user
 * @route GET /api/v1/projects
 * @access Private
 */

const getAllProjects = async (req, res) => {
    const { uid } = req.user;
    const projects = await Project.find({ uid: uid });
    // console.log('🚀 ~ file: projectsController.js:12 ~ getAllProjects ~ projects', projects);

    if (!projects?.length) {
        console.log('in projectsController: No todo found');

        return res.status(204).json({ msg: `No projects found with uid ${uid}` });
    }
    res.status(200).json(projects);
};

/**
 * @description Get one project
 * @route GET /api/v1/projects/:id
 * @access Private
 */

const getProject = async (req, res) => {
    const {
        user: { uid },
        params: { id: projectId },
    } = req;
    console.log(`uid: `, uid);
    console.log(`projectId:`, projectId);
    
    const project = await Project.findOne({ uid: uid, _id: projectId });
    res.status(200).json(project);
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

    const newProject = await Project.create({ uid, title, expireAt: isAnonymous ? expireTime() : null });

    return res.status(201).json({ msg: 'New Project has been created' });
    // if (newProject) {
    // return res.status(201).json({ msg: 'New Project has been created' });
    // } else {
    //     return res.status(400).json({ msg: 'Invalid project data' });
    // }
};

/**
 * @description Update projects
 * @route PATCH /api/v1/projects
 * @access Private
 */

const updateProject = async (req, res) => {
    const {
        body: { title },
        user: { uid },
        params: { id: projectId },
    } = req;

    if (!title) {
        return res.status(400).json({ msg: `No todo title` });
    }
    if (!uid) {
        return res.status(400).json({ msg: `No uid` });
    }
    const project = await Project.findByIdAndUpdate({ _id: projectId, uid: uid }, req.body, {
        new: true,
        runValidators: true,
    });
    // findById(): Finds a single document by its _id field
    // const project = await Project.findById(projectId).exec();
    if (!project) {
        return res.status(400).json({ message: 'Project not found' });
    }

    return res.status(200).json({ msg: `Project updated. id: ${project._id}` });
};

/**
 * @description Delete projects
 * @route DELETE /api/v1/projects
 * @access Private
 */

const deleteProject = async (req, res) => {
    const {
        user: { uid },
        params: { id: projectId },
    } = req;

    if (!projectId) {
        return res.status(400).json({ msg: 'ProjectId required' });
    }
    if (!uid) {
        return res.status(400).json({ msg: `No uid` });
    }

    const project = await Project.findByIdAndDelete({ _id: projectId, uid: uid });
    // const project = await Project.findById(projectId).exec();
    if (!project) {
        return res.status(400).json({ msg: 'Project not found' });
    }
    const result = await project.deleteOne();
    res.json({ msg: `Project has been deleted` });
};

module.exports = {
    createNewProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
};
