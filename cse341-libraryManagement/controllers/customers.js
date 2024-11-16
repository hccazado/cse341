const db = require("../models");
const Customer = require("../models/customers");
const createError = require("http-errors");
const utilities = require("../services/utilities");

const controller = {
    allCustomers: async (req, res, next) =>{
        /*
            #swagger.description = Returns all stored customers
        */
        try{
            const docs = await Customer.find();
            res.status(200).json(docs);
        } catch(error) {
            throw createError("500","MongoDB error(Customer). "+error);
        }
    },
    oneCustomer: async (req, res, next) =>{
        /*
            #swagger.description = Returns a customer with id
        */
        if(!utilities.validateObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid customer id"});
        }
        try{
            const doc = await Customer.findById(req.params.id);
            res.status(200).json(doc);
        } catch(error) {
            throw createError("500","MongoDB error(Customer). "+error);
        }
    },
    detailCustomerBorrows: async (req, res, next)=>{
        /*
            #swagger.description = Returns a customer with id, and details about its borrowd books
        */
        if(!utilities.validateObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid customer id"});
        }
        try{
            const docs = await Customer.findOne({_id: req.params.id}).populate("borrowedBooks");
            res.status(200).json(docs);
        } catch(error) {
            throw createError("500","MongoDB error(Customer). "+error);
        }
    },
    createCustomer: async (req, res, next) =>{
        /*
            #swagger.description = Creates a new customer
        */
        const customer = new Customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob,
            borrowedBooks: req.body.borrowedBooks || []
        });

        try{
            let doc = await customer.save();
            res.status(200).json(doc);
        }catch(error){
            throw createError("500","MongoDB error(Customer). "+error);
        }
    },
    updateCustomer: async (req, res, next) =>{
        /*
            #swagger.description = Update a customer with id
        */
        if(!utilities.validateObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid customer id"});
        }

        const newCustomerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob,
            borrowedBooks: req.body.borrowedBooks
        }

        try{
            const doc = await Customer.findOneAndUpdate({_id: req.params.id}, newCustomerData, {
                lean:true, 
                returnDocument:"after"
            }).then(result=>{
                res.status(204).send();
            })
        } catch(error) {
            throw createError("500","MongoDB error(Customer). "+error);
        }

    },
    deleteCustomer: async (req, res, next) => {
        /*
            #swagger.description = Delete a customer with ID
        */
        if(!utilities.validateObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid customer id"});
        }
        try{
            console.log("Delete customer")
            const doc = await Customer.findOneAndDelete({_id:req.params.id});
            res.status(204).send();
        } catch(error) {
            throw createError("500","MongoDB error(Customer). "+error);
        }
    },
}

module.exports = controller;