const express = require("express");
// const express = require("express-async-handler");

const { expressErrorHandler } = require("./middleware/error_handlerMiddleware");
require("./config/dbConnection");
const { router } = require("./routes/index");

const app = express();
app.use(express.json());

// app.get("/normal-way", (req, res, next) => {
//     res.json({
//         text: "Hello there"
//     })
// })

// api routes
app.use("/api/", router);

app.use(expressErrorHandler);

app.listen(3000, () => {
    console.log("server started in port 3000");
});