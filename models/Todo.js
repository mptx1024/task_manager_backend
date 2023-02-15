const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        // firebase issued UID
        uid: {
            type: String,
            required: [true, 'UID not provided'],
            ref: 'User',
        },

        title: {
            type: String,
            required: [true, 'Title not provided'],
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: Boolean,
            default: false,
        },

        dueDate: {
            type: Date,
            min: '2023-01-20',
            max: '2099-12-31',
            required: false,
        },

        // Mongoose generated id
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Project',
        },

        expireAt: {
            type: Date,
        },
    },
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
    //createdAt: a date representing when this document was created
    //updatedAt: a date representing when this document was last updated
    { timestamps: true }
);

todoSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// todoSchema.pre('deleteOne', { document: true }, function (next) {
//     // const projectId = this.getQuery()['_id'];
//     const projectId = this.projectId;
//     console.log('🚀 ~ file: Todo.js:69 ~ projectId', projectId);

//     mongoose.model('Project').updateOne(
//         { _id: projectId },
//         {
//             todoList: todoList.filter((todoId) => todoId !== this._id),
//         },

//         (err, result) => {
//             if (err) {
//                 console.log(`[error] ${err}`);
//                 next(err);
//             } else {
//                 console.log("success deleting todo reference in project's todo list");
//                 next();
//             }
//         }
//     );
// });
module.exports = mongoose.model('Todo', todoSchema);
