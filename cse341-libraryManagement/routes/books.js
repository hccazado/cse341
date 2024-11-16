const express = require("express");
const routes = express.Router();
const controller = require("../controllers/books");
const validateBook = require("../validator/book");

routes.get("/", controller.allBooks);
routes.post("/", validateBook.validationRules(), validateBook.validate, controller.createBook);
routes.get("/:id", controller.oneBook);
routes.put("/:id", controller.updateBook);
routes.delete("/:id", controller.deleteBook);

module.exports = routes;
