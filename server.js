require("dotenv").config();
const path = require('path');
const express = require("express")
const app  =  express();
const  mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");


app.use(cors());
app.use(express.json());
app.use(router);

//deployment code start

app.use(express.static(path.join(__dirname,'./client/build')));
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//deployment code end


const port = 8003;




app.listen(port,()=>{
    console.log(`server is start port number ${port}`);
})