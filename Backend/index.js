
const express = require("express");
const { connection } = require("./db");
const { authorization } = require("./middlewares/auth.middleware");
const { postroute } = require("./routes/post.route");
const { userroute } = require("./routes/users.route");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/users",userroute);
app.use(authorization);
app.use("/posts",postroute);

app.listen(process.env.port , async()=>{

try {
    await connection;

    console.log("database is connected");

} catch (error) {
    console.log(error);
}

});



