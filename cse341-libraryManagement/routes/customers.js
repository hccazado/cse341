const express = require("express");
const routes = express.Router();
const controller = require("../controllers/customers");
const validateCustomer = require("../validator/customer");


routes.get("/:id/borrows", controller.detailCustomerBorrows);
routes.get("/:id", controller.oneCustomer);
routes.put("/:id", validateCustomer.validationRules(), validateCustomer.validate, controller.updateCustomer);
routes.delete("/:id", controller.deleteCustomer);
routes.post("/", validateCustomer.validationRules(), validateCustomer.validate, controller.createCustomer);
routes.get("/", controller.allCustomers);

module.exports = routes;