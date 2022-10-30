const mongoose = require('mongoose');

require("dotenv").config();

mongoose.connect(process.env.CONNECTION_STRING,
    () => {
        console.log("database connected");
    },
    e => {
        console.error(e);
    }
);

