const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    // firebase issued UID
    uid: {
        type: String,
        required: [true, 'UID not provided'],
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Title not provided'],
    },

    todoList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],

    expireAt: {
        type: Date,
    },
});
projectSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
projectSchema.pre('deleteOne', function (next) {
    const projectId = this.getQuery()['_id'];
    mongoose.model('Todo').deleteMany({ projectId: projectId }, (err, result) => {
        if (err) {
            console.log(`[error] ${err}`);
            next(err);
        } else {
            console.log('success in deleting all project referenced todos');
            next();
        }
    });
});

module.exports = mongoose.model('Project', projectSchema);
