# MERN Task Manager built with React, Redux RTK Query, MUI 5, Nodejs and Firebase Auth

## _This is the backend repo. For frontend repo please [click here](https://github.com/fjiasigmoid/task_manager_frontend)_

### Web

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTIyYWQ2NzBjNThiMzZiYzMzOWI4ZGE2ZmM1MGQ4YTQ2NDZkMDBkNiZjdD1n/aNBKcmKwhsaakNrhMN/giphy.gif)

### Mobile

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzRkZDgxMjFjY2I3NDFkNjFhZjBmOTk2OTVmNGQxZTEyMmE2MDZhMCZjdD1n/W9k8QGNVqPO7bQ17US/giphy.gif)

## Check out [live demo](https://task-manager003.vercel.app/)

🚀 Task Manager integrated with caching techniques to optimize UI performance

## Features

-   Create and modify task with Due date, Priority and Project
-   Mobile responsiveness & Dark theme
-   Filter by Priority, Date, Projects, and Overdue
-   Solcial and anonymous login

## Highlights

-   ### Frontend

    -   [Redux RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching and cache management
    -   [Opimistic update strategy](https://itnext.io/caching-in-a-pwa-when-to-use-optimistic-vs-pessimistic-d627a5943990)
        -   Update cache in parallel with running queries, allowing instant UI response to user
    -   [Automated re-fetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching) with tagging system
        -   Optimize data fetching and reduce unnecessary network requests
    -   Persistent login
        -   Restore app state & data after refreshing pages
    -   Integrate with [Firebase Auth](https://firebase.google.com/products/auth)
        -   Social and anonyous login
    -   Dark mode with [MUI v5](https://mui.com/material-ui/customization/dark-mode/)

-   ### Backend

    -   JWT token authentication
    -   Automatically create & destroy template tasks and anonymous user records

## Requirements

1. Firebase login

-   The backend uses [Firebase admin SDK](https://firebase.google.com/docs/reference/admin) to authenticate user (frontend on the other hand uses the [client SDK](https://firebase.google.com/docs/firestore/client/libraries)). You need to create an Firebase project and get credentials. It's free and easy. You can follow this [tutorial](https://firebase.google.com/docs/admin/setup) to create a Firebase project. After that:

    1. In your Firebase project console, download the credential in JSON:

        <img src="https://drive.google.com/uc?id=14qC9RBe_W-7_vhfcsDyptDDvuic8gQHf"
              alt=""
              style="display: block; margin-right: auto; width: 50%;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" />

    2. In your Firebase project console, go to authentication and add `Google` and `Anonymous` as sign-in providers

        <img src="https://drive.google.com/uc?id=1i_7rwwwdGzycLmprb1HOsWtkQMSPt8vg"
              alt=""
              style="display: block; margin-right: auto; width: 50%;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" />

    These credentals will be later placed in the .env file.

2. MongoDB Database

-   Follow this [guide](https://www.mongodb.com/basics/create-database) to create MongoDB database with Altas. Then in your MongoDB dashboard, click through these two steps:

    1.  <img src="https://drive.google.com/uc?id=1U0nFB3vgRaIxqVUq0mejYilFs6k0ur3g"
                  alt=""
                  style="display: block; margin-right: auto; width: 50%;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" />

    2.  <img src="https://drive.google.com/uc?id=1npmpBOR7h6Zc8BCJNUEdZ0g1g4NWBBq3"
                  alt=""
                  style="display: block; margin-right: auto; width: 50%;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" />

    3.  You have just copied the mongoDB URI which will be used to connect your backend to MongoDB. **We need to insert 'todo' before the question mark.** (this will automatically name the DB as 'todo')

        ```
        mongodb+srv://username123:password123@cluster0.a9alg1l.mongodb.net/todo?retryWrites=true&w=majority
        ```

Again the DB credentals will be later placed in the .env file.

## Install

<span style="color:red">(To run the entire app you also need to install the [frontend repo](https://github.com/fjiasigmoid/task_manager_frontend))</span>

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/fjiasigmoid/task_manager_backend.git my-project-name
cd my-project-name
npm install
```

Create an .env file on the root directory. Place in your Firebase & MongoDB credentials obtained through the above process:

```
#MongoDB
DATABASE_URI = your_db_uri

# Firebase credential
FIREBASE_PROJECT_ID=your_firebase_credential
FIREBASE_PRIVATE_KEY_ID=your_firebase_credential
FIREBASE_CLIENT_EMAIL=your_firebase_credential
```

Finally, run locally with live reload:

```
npm run dev
```

Now http://localhost:3500 will be accessible by frontend ✨

<img src="https://drive.google.com/uc?id=1UlDeufXsDPewoopt6R1Kryc3iW1y2VWB"
                  alt=""
                  style="display: block; margin-right: auto; width: 50%;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" />

Made with ♥ by [fjiaSigmoid](https://github.com/fjiaSigmoid)
