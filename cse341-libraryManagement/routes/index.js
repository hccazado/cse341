const express = require("express");
const routes = express.Router();

routes.use("/customers", require("./customers"));
routes.use("/books", require("./books"));
routes.use("/library", require("./library"));

routes.get("/",(req, res)=>{
    // #swagger.ignore = true
    res.status(200).json({message: "Welcome to Library Management API. Check docs!"});
});

module.exports = routes;