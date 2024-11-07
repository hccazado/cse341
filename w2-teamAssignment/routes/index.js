const routes = require('express').Router();
const temple = require('./temple');

routes.get("/", (req, res)=>{
  // #swagger.ignore = true
  res.redirect("/api-docs")});
  
routes.use('/temples', temple);

module.exports = routes;
