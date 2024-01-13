const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDatabase } = require("./database/dbconfig");

// use method connect with server
    HTTP_SERVER.use(cors());
    HTTP_SERVER.use(bodyParser.json());


// connecting env file to access env variable
    require('dotenv').config();


// connecting moongose database
    connectToDatabase();


// connecting Application to the server 
    HTTP_SERVER.listen(process.env.PORT, ()=>{
        console.log('APP Listening to PORT ' + process.env.PORT)
    })



// Student Routes 
    HTTP_SERVER.use("/api/students",require("./controllers/student/student.controller"));
    HTTP_SERVER.use("/api/students/create",require("./controllers/student/student.controller"));
    HTTP_SERVER.use("/api/students/no-mentor",require("./controllers/student/student.controller"));
    HTTP_SERVER.use("/api/students/:id",require("./controllers/student/student.controller"));



// Mentor Routes
    HTTP_SERVER.use("/api/mentors",require("./controllers/mentor/mentor.controller"));
    HTTP_SERVER.use("/api/mentors/create",require("./controllers/mentor/mentor.controller"));
    HTTP_SERVER.use("/api/mentors/:id",require("./controllers/mentor/mentor.controller"));


    

