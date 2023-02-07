todos = [
    {
        // _id: new ObjectId('63e06071db0b830f747c64ac'),
        uid: 'cdayJHQxJzYVwECt0704IKZ6A53U',
        title: 't3',
        completed: true,
        priority: true,
        dueDate: new Date('2023-02-20'),
        // projectId: new ObjectId('63dabdfcef3d1e354ea31d00'),
    },
    {
        // _id: new ObjectId('63e060f2db0b830f747c64be'),
        uid: 'cdayJHQxJzYVwECt0704IKZ6A53U',
        title: 't5',
        completed: false,
        priority: true,
        dueDate: null,
        // projectId: new ObjectId('63dabe04ef3d1e354ea31d05'),
    },
];
projects = [
    {
        uid: 'cdayJHQxJzYVwECt0704IKZ6A53U',
        title: 'template project 1',
        todoList: [
            // new ObjectId("63dadd2c4e55c10ae1ccb34f"),
            // new ObjectId("63dadda54e55c10ae1ccb359"),
            // new ObjectId("63de93adf987fff2320c53fd"),
            // new ObjectId("63dd8ea462459dcb41393e2d"),
            // new ObjectId("63e06071db0b830f747c64ac"),
            // new ObjectId("63e09038db0b830f747c653a")
        ],
    },
    {
        uid: 'cdayJHQxJzYVwECt0704IKZ6A53U',
        title: 'template project 2',
        todoList: [],
    },
];
module.exports = todos;
