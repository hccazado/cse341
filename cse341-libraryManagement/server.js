const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const dotEnv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotEnv.config();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
})

db.mongoose.connect(db.url).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.error("Cannot connect to MongoDB"+error);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./routes"));

process.on("uncaughtException", (error, origin)=>{
    console.log(`caught exception: ${error}\nException origin: ${origin}`);
});


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("App listening on PORT: "+PORT);
})

