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
            return next(error);
        }
    },
    oneCustomer: async (req, res, next) =>{
        /*
            #swagger.description = Returns a customer with id
        */
        if(!utilities.validateObjectId(req.params.id)){
            return next({message:"Must provide a valid customer id",statusCode: 401});
        }
        try{
            const doc = await Customer.findById(req.params.id);
            res.status(200).json(doc);
        } catch(error) {
            next(error);
        }
    },
    detailCustomerBorrows: async (req, res, next)=>{
        /*
            #swagger.description = Returns a customer with id, and details about its borrowd books
        */
        if(!utilities.validateObjectId(req.params.id)){
            return next({message:"Must provide a valid customer id",statusCode: 401});
        }
        try{
            const docs = await Customer.findOne({_id: req.params.id}).populate("borrowedBooks");
            res.status(200).json(docs);
        } catch(error) {
            return next(error);
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
            return next(error);
        }
    },
    updateCustomer: async (req, res, next) =>{
        /*
            #swagger.description = Update a customer with id
        */
        if(!utilities.validateObjectId(req.params.id)){
            return next({message:"Must provide a valid customer id",statusCode: 401});
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
            return next(error);
        }

    },
    deleteCustomer: async (req, res, next) => {
        /*
            #swagger.description = Delete a customer with ID
        */
        if(!utilities.validateObjectId(req.params.id)){
            return next({message:"Must provide a valid customer id",statusCode: 401});
        }
        try{
            const doc = await Customer.findOneAndDelete({_id:req.params.id});
            res.status(204).send();
        } catch(error) {
            return next(error);
        }
    },
}

module.exports = controller;