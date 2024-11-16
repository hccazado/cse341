const express = require("express");
const routes = express.Router();
const controller = require("../controllers/customers");
const validateCustomer = require("../validator/customer");


routes.get("/:id/borrows", controller.detailCustomerBorrows);
routes.get("/:id", controller.oneCustomer);
routes.get("/", controller.allCustomers);
routes.post("/", validateCustomer.validationRules(), validateCustomer.validate, controller.createCustomer);
routes.put("/:id", validateCustomer.validationRules(), validateCustomer.validate, controller.updateCustomer);
routes.delete("/:id", controller.deleteCustomer);

module.exports = routes;