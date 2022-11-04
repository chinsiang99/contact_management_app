const mongoose = require('mongoose');

require("dotenv").config();

const connectDatabase = async () =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }catch(e){
        console.log("Database is not connected!");
    }

}

connectDatabase();


