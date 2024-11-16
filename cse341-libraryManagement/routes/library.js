const express = require("express");
const routes = express.Router();
const controller = require("../controllers/library");

routes.get("/:customerid/:bookid", controller.borrow);
routes.delete("/:customerid/:bookid", controller.returnBook);

module.exports = routes;