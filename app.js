const express = require("express");
const app = express();
const mongoose = require("mongoose");
const studentRouter = require("./Routes/Student");
const teacherRouter = require("./Routes/Teacher");
require("dotenv").config();

const username = process.env.username;
const password = process.env.password;

mongoose.connect(`mongodb+srv://${username}:${password}@mflix.of6isli.mongodb.net/?retryWrites=true&w=majority`, {
   dbName : process.env.dbName,
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to mongoose");
});

app.use(express.json());

app.listen(8080, ()=> console.log("Server is running on port 8080"));

app.use("/student", studentRouter );
app.use("/teacher", teacherRouter);
