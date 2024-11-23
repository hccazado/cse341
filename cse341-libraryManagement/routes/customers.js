const express = require("express");
const routes = express.Router();
const controller = require("../controllers/customers");
const validateCustomer = require("../validator/customer");
const {isAuthenticated} = require("../services/authenticate");

routes.get("/:id/borrows", controller.detailCustomerBorrows);
routes.get("/:id", controller.oneCustomer);
routes.put("/:id", isAuthenticated, validateCustomer.validationRules(), validateCustomer.validate, controller.updateCustomer);
routes.delete("/:id", isAuthenticated, controller.deleteCustomer);
routes.post("/", isAuthenticated, validateCustomer.validationRules(), validateCustomer.validate, controller.createCustomer);
routes.get("/", controller.allCustomers);

module.exports = routes;