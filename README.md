# Contact Management App

### `Introduction`
Contact management App is the set of backend APIs which allows the user to manage their contacts. As this is a backend express project so to test the APIs we can use HTTP client (e.g. postman) and do the CRUD operations on the Contacts. The App will also contain the Registration of the Users along with login and current logged in user info apis. Only logged in users can manage the contacts of their own.

### `Goals`

• Users can register for their account.\
• Once registration is successful, users can login to their account and manage their contacts.\
• Users can create, update, delete, get all contacts or get a single contact which they have created.\
• Prevent users from managing contacts of different users.\
• Users should have a valid access token to use the private endpoints.\
• Proper error messages with status code should be provided to the users in case of any error.\
• Users password should not be stored as raw password in the Database.\
• Provide users with a signed JWT access token on successful login to access private endpoints.

### `Tools & Libraries`

• Node.js : ( module: http, path )\
• Express : Use to get robust features to build web application using node.js (router, body parser, request params)\
• Bcrypt : Used for hashing the user password and compare the hash password during login\
• Dotenv : Used to access the environment variables via node.js process core module into our files\
• Express-async-handler : Middleware used to handle exceptions inside of
async express routes and passing them to your express error handlers\
• Jsonwebtoken : Used to add authentication to the apis by signing and verifying the access token.\
• MongoDB : Used as a NO-SQL database to store our data in document/
collections in the form of JSON objects.\
• Mongoose : Used to create object model design schema for our entities like (Contacts, Users) and provide access to methods on the entities to
communicate with MongoDB.\
• Postman : Used to test the API endpoints we have created.\ 
• Nodemon : Used to detect the changes in file and restart the server automatically, especially used for development purposes.

## Steps to Get Started

### `1) Clone repository`

Please run git clone `https://github.com/chinsiang99/contact_management_app.git`

### `2) Install Packages`

Please run `npm install` after cloning the repository

### `3) `

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.