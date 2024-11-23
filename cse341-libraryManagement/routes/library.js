const express = require("express");
const routes = express.Router();
const controller = require("../controllers/library");
const { isAuthenticated } = require("../services/authenticate");

routes.get("/:customerid/:bookid", isAuthenticated, controller.borrow);
routes.delete("/:customerid/:bookid", isAuthenticated, controller.returnBook);

module.exports = routes;