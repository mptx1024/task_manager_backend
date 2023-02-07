## Firebase emulator start

-   firebase emulators:start --only auth
-   firebase emulators:start --only auth --import /Users/frankjia/Downloads/firebaseEmulatorData --export-on-exit


// Put it in server.js: Used to create new user to Emulator auth (check it's UI) when starting server
//
// admin
// .auth()
// .createUser({
// displayName: 'John Doe',
// email: 'user@example.com',
// password: 'secretPassword',
// })
// .then((user) => {
// console.log('Successfully created new user:', user);
// })
// .catch((error) => {
// console.log('Error creating new user:', error);
// });

# simulated google account mongoDB document:
{"_id":{"$oid":"63d34d061ce589f594bea8e4"},"username":"Chicken Peach","uid":"6TYE4HvD773CNltosypgCB7FH1Ye","email":"chicken.peach.388@example.com","photoUrl":"https://randomuser.me/api/portraits/women/77.jpg","isAnonymous":false,"__v":{"$numberInt":"0"}}