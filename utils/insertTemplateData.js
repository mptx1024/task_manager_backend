const Project = require('../models/Project');
const Todo = require('../models/Todo');
const expireTime = require('../config/anonymousDataExpireTime');

const insertTemplateData = async (uid, isAnonymous) => {
    let studyProjectId;
    let workProjectId;

    const projects = await Project.insertMany(
        [
            {
                uid: uid,
                title: 'Study',
                expireAt: isAnonymous ? expireTime() : null,
            },
            // {
            //     uid: uid,
            //     title: 'Home',
            //     expireAt: isAnonymous ? expireTime() : null,
            // },
        ],
        { ordered: false }
    );

    for (const project of projects) {
        if (project.title === 'Study') {
            studyProjectId = project._id;
        } else if (project.title === 'Home') {
            workProjectId = project._id;
        }
    }

    const todos = await Todo.insertMany(
        [
            {
                uid: uid,
                title: 'Research separation of concern',
                dueDate: new Date(),
                projectId: studyProjectId,
                priority: true,
                expireAt: isAnonymous ? expireTime() : null,
            },
            // {
            //     uid: uid,
            //     title: 'Learn redux RTK query',
            //     dueDate: new Date(),
            //     projectId: studyProjectId,
            //     priority: true,
            //     expireAt: isAnonymous ? expireTime() : null,
            // },
        ],
        { ordered: false }
    );

    return;
};

module.exports = insertTemplateData;
