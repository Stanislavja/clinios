# Clinios

## Stack

- React.js
- Redux
- Material-UI
- Node + Express
- MySQL

## Database

1. Install MySQL
2. Load file mysql_start.txt

To query the database we recommend MySQL Workbench https://www.mysql.com/products/workbench/

## Client

Setup:

1. `cd client`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials

To run:

1. `yarn start` or `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)

## API

Setup:

1. `cd server`
2. `yarn install`
3. copy `.env.sample` into `.env` and fill in credentials
4. Make sure your database is running on your machine

To run:

1. `yarn dev` or `npm run dev` for development, `yarn start` for production
2. API end point would be `http://localhost:5001`

## Prettier

1. In Visual Studio Code install the Prettier extension.
2. Go to Code -> Settings -> Preferences, search for `editor.formatOnSave`, set to True.

## Doctor Login

1. Login page for doctors/clients http://localhost:3000/login_client
2. Use email test@test.com password 12345678
3. Use these credentials so you will see the correct demo data.

If you get an error "Client does not support authentication protocol requested by server" then
    `alter user 'root'@'localhost' identified with mysql_native_password by '12345678'`
    
## Patient Login

1. Login page for patients http://localhost:3000/login/ultrawellness
2. Use email test@test.com password 12345678
3. Use these credentials so you will see the correct demo data.
    
## Patient Signup

1. Login page for patients http://localhost:3000/signup/ultrawellness

## Email

To test email notifications (only for development):

1. Get `username` and `password` from `https://ethereal.email/create`
2. Check emails on `https://ethereal.email/messages`

## Structure

We would like to follow the following folder and file structure. 
```
app
├── config
│   └── routes.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   ├── stores
│       │   │   │   │   │   └── ReportsStore.js
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── components
│       │   │   │       └── index.js
│       │   │   ├── shared
│       │   │   │   └── stores
│       │   │   │       ├── AccountStore.js
│       │   │   │       └── UserStore.js
│       │   │   └── index.js
│       │   └── Course
│       │       ├── components
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       ├── components
│       │       │       └── index.js
│       │       └── index.js
│       ├── shared
│       │   └── components
│       │       ├── Avatar.js
│       │       └── Icon.js
│       └── index.js
├── shared
│   └── util
│       └── createStore.js
└── index.js
```
