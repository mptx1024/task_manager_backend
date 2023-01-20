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
