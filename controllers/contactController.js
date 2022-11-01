const Contact = require("../model/contactModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

// getting all contacts
const getAllContacts = asyncHandler(async (req,res,next)=>{
    const {id} = req.user;
})

const createContact = asyncHandler(async (req,res,next)=>{
    const {id} = req.user;
    const {name, email, phone} = req.body;

    // check whether every fields are filled in
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const regex = /\S+@\S+\.\S+/;

    // email format validation
    if (!email.match(regex)) {
        res.status(400);
        throw new Error("Invalid email format, please insert a valid email format");
    }

    try {
        const createContact = await Contact.create({
            User: id,
            name: name,
            email: email,
            phone: phone
        });
        console.log(createContact);
        res.status(201).json({
            message: "Create Contact Successful!"
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }
    
    // const 
    // res.json({
    //     message: "hello there"
    // })
})

const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    // regex for email
    const regex = /\S+@\S+\.\S+/;
    // const regex2 = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // check either username, email or password is not filled
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // email format validation
    if (!email.match(regex)) {
        res.status(400);
        throw new Error("Invalid email format, please insert a valid email format");
    }

    const duplicateEmail = await User.where("email").equals(email).limit(1);

    if (duplicateEmail.length > 0) {
        throw new Error(`Duplicate email: ${email}`);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
        const createUser = await User.create({
            username: username,
            email: email,
            password: hash
        });
        console.log(createUser);
        res.status(201).json({
            message: "Register Successfully!"
        })
    } catch (e) {
        const errorMessage = e.message;
        res.status(500);
        throw new Error(errorMessage);
    }

});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check either email or password is not filled
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // check whether the email is registered
    const user = await User.where("email").equals(email);
    if (!user.length) {
        res.status(401);
        throw new Error("Email is not registered");
    }

    // compare the password to check whether they match each other
    authorized = await bcrypt.compare(password, user[0].password);

    if (authorized) {
        const accessToken = jwt.sign(
            {
                user: {
                    id: user[0]._id,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "24h" }
        );
        res.status(200).json({
            token: accessToken
        })

    } else {
        res.status(401);
        throw new Error("Invalid password");
    }
})

const getCurrentUser = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const currentUser = await User.where("_id").equals(id);

    if (currentUser.length > 0) {
        res.status(200).json({
            status: 200,
            message: "Retrieve Current User Detail Successful",
            userDetail: currentUser[0]
        })
    } else {
        res.status(400);
        throw new Error("No Record found");
    }
})

module.exports = { createContact, registerUser, loginUser, getCurrentUser }