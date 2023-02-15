const Project = require('../models/Project');
const Todo = require('../models/Todo');
const expireTime = require('../config/anonymousDataExpireTime');

const injectSampleData = async (uid, isAnonymous) => {
    let studyProjectId;
    let workProjectId;
    //https://stackoverflow.com/questions/54714148/mongoose-update-or-insert-many-documents
    //https://www.mongodb.com/docs/manual/reference/method/db.collection.bulkWrite/
    // Try bulkWrite()

    const projects = await Project.insertMany([
        {
            uid: uid,
            title: 'Study',
            expireAt: isAnonymous ? expireTime() : null,
        },
        {
            uid: uid,
            title: 'Work',
            expireAt: isAnonymous ? expireTime() : null,
        },
    ]);

    for (const project of projects) {
        if (project.title === 'Study') {
            studyProjectId = project._id;
        } else if (project.title === 'Work') {
            workProjectId = project._id;
        }
    }
    const today = new Date();

    await Todo.insertMany([
        {
            uid: uid,
            title: 'Sample task 1',
            dueDate: today,
            projectId: studyProjectId,
            priority: false,
            expireAt: isAnonymous ? expireTime() : null,
        },

        {
            uid: uid,
            title: 'Sample task 2',
            dueDate: null,
            projectId: null,
            priority: false,
            completed: false,
            expireAt: isAnonymous ? expireTime() : null,
        },
        {
            uid: uid,
            title: 'Sample task 3',
            dueDate: new Date(today.getTime() - 86400000 * 2),
            projectId: workProjectId,
            priority: false,
            completed: false,
            expireAt: isAnonymous ? expireTime() : null,
        },
        {
            uid: uid,
            title: 'Sample task 4',
            dueDate: today,
            projectId: studyProjectId,
            priority: false,
            completed: true,
            expireAt: isAnonymous ? expireTime() : null,
        },
        {
            uid: uid,
            title: 'Sample task 5',
            dueDate: new Date(today.getTime() - 86400000 * 3),
            projectId: workProjectId,
            priority: false,
            completed: true,
            expireAt: isAnonymous ? expireTime() : null,
        },
    ]);
    // return;
};

module.exports = injectSampleData;
