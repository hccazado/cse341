const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const createError = require("http-errors");


const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

app.use((req,res)=>{
  res.status(404).json("Invalid route");
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({error: {
    status: error.status,
    message: error.message
    } 
  });
});

process.on("uncaughtException", (error, origin)=>{
  console.log(process.stderr, `caught exception: ${error}\nException origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
