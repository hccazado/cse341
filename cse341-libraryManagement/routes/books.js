const express = require("express");
const routes = express.Router();
const controller = require("../controllers/books");
const validateBook = require("../validator/book");
const {isAuthenticated} = require("../services/authenticate");

routes.get("/", controller.allBooks);
routes.post("/", isAuthenticated, validateBook.validationRules(), validateBook.validate, controller.createBook);
routes.get("/:id", controller.oneBook);
routes.put("/:id", isAuthenticated, validateBook.validationRules(), validateBook.validate, controller.updateBook);
routes.delete("/:id", isAuthenticated, controller.deleteBook);

module.exports = routes;
