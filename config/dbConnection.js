const mongoose = require('mongoose');

const url = "mongodb+srv://chinsiang99:talentlabs@cluster0.4oeg9ux.mongodb.net/test";
// await mongoose.connect('mongodb://localhost/my_database');

mongoose.connect(url,
    () => {
        console.log("connected");
    },
    e => {
        console.error(e);
    }
);

