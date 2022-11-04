# Contact Management App

### `Introduction`
<p align="justify">Contact management App is the set of backend APIs which allows the user to manage their contacts. As this is a backend express project so to test the APIs we can use HTTP client (e.g. postman) and do the CRUD operations on the Contacts. The App will also contain the Registration of the Users along with login and current logged in user info apis. Only logged in users can manage the contacts of their own.</p>

### `Goals`
<ul align="justify">
  <li>Users can register for their account.</li>
  <li>Once registration is successful, users can login to their account and manage their contacts.</li>
  <li>Users can create, update, delete, get all contacts or get a single contact which they have created.</li>
  <li>Prevent users from managing contacts of different users.</li>
  <li>Users should have a valid access token to use the private endpoints.</li>
  <li>Proper error messages with status code should be provided to the users in case of any error.</li>
  <li>Users password should not be stored as raw password in the Database.</li>
  <li>Provide users with a signed JWT access token on successful login to access private endpoints.</li>
</ul>

### `Tools & Libraries`

<ul align="justify">
  <li>Node.js : ( module: http, path )</li>
  <li>Express : Use to get robust features to build web application using node.js (router, body parser, request params)</li>
  <li>Bcrypt : Used for hashing the user password and compare the hash password during login</li>
  <li>Dotenv : Used to access the environment variables via node.js process core module into our files</li>
  <li>Express-async-handler : Middleware used to handle exceptions inside of async express routes and passing them to your express error handlers</li>
  <li>Jsonwebtoken : Used to add authentication to the apis by signing and verifying the access token.</li>
  <li>MongoDB : Used as a NO-SQL database to store our data in document/collections in the form of JSON objects.</li>
  <li>Mongoose : Used to create object model design schema for our entities like (Contacts, Users) and provide access to methods on the entities to communicate with MongoDB.</li>
  <li>Postman : Used to test the API endpoints we have created.</li> 
  <li>Nodemon : Used to detect the changes in file and restart the server automatically, especially used for development purposes.</li>
</ul>

## Steps to Get Started

### `1) Clone repository`

Please run git clone `https://github.com/chinsiang99/contact_management_app.git`

### `2) Install Packages`

Please run `npm install` after cloning the repository

### `3) Request for .env File`

Request for .env file from `chinsiang99@gmail.com`

### `4) Done`

Run `npm run dev` to start the application

## Routes Used

### `userRoutes`

`GET: /api/users/getUsers` (Public Route) - for internal checking and referencing

`POST: /api/users/registerUser` (Public Route)

`POST: /api/users/login` (Public Route)

`GET: /api/users/current` (Private route)

### `contactRoutes`

`GET: /api/contacts` (Private route)

`POST: /api/contacts` (Private route)

`GET: /api/contacts/:contact_id` (Private route)

`PUT: /api/contacts/:contact_id` (Private route)

`DELETE: /api/contacts/:contact_id` (Private route)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Test the application starting with http://localhost:3000