//Express server
const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req,res) =>{
    res.send("Hello from express")
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, ()=>{
    console.log(`Web Server listenin on: ${PORT}`);
});