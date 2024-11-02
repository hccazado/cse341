const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const {MongoClient} = require('mongodb');
const mongodb = require("./db/connect");
dotenv.config();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

app.use("/professional", require("./routes/professional"));

const PORT = process.env.PORT || 8080;

mongodb.initDb((error, mongodb)=>{
    if(error){
        console.log(error);
    }
    else{
        app.listen(PORT);
        console.log("server and DB runnning at: "+PORT);
    }
});