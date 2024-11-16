const db = require("../models");
const Book = require("../models/books");
const createError = require("http-errors");

const controller = {
    allBooks: async (req, res, next)=>{
        /*
            #swagger.description = Returns all stored books
        */
        try{
            const docs = await Book.find();
            res.status(200).json(docs);
        } catch (error) {
            throw createError("500","MongoDB error. "+error);
        }
    },
    oneBook: async (req, res, next)=>{
        /*
            #swagger.description = Returns a stored book with id
        */
        if(!db.mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid book id"});
            throw createError("400", "Must provide a valid book id");
        }
        try{
            const doc = await Book.findById(req.params.id);
            res.status(200).json(doc);
        } catch(error) {
            throw createError("500","MongoDB error. "+error);
        }
    },
    createBook: async (req, res, next)=>{
        /*
            #swagger.description = Create a new book
        */
        const book = new Book({
            title: req.body.title,
            isbn: req.body.isbn,
            author: req.body.author,
            category: req.body.category,
            quantity: req.body.quantity,
            availableQuantity: req.body.availableQuantity
        });
        try{
            const doc = await book.save();
            res.status(200).json(doc);
        }catch(error){
            throw createError("500","MongoDB Error. "+error);
        }
    },
    updateBook: async (req, res, next) => {
        /*
            #swagger.description = Update a book with id
        */
        if(!db.mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid book id"});
        }
        
        const newData = {
            title: req.body.title,
            isbn: req.body.isbn,
            author: req.body.author,
            category: req.body.category,
            quantity: req.body.quantity,
            availableQuantity: req.body.availableQuantity
        }

        try{
            const result = await Book.findOneAndUpdate({_id: req.params.id},newData,{
                lean:true, 
                returnDocument:"after"
            })
            res.status(204).send();
        } catch(error) {
            throw createError("500","MongoDB Error. "+error);
        }
    },
    deleteBook: async (req, res, next) => {
        /*
            #swagger.description = Delete a book with id
        */
        if(!db.mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({message: "Must provide a valid book id"});
        }
        try{
            const result = await Book.findOneAndDelete({_id: req.params.id});
            res.status(204).send();
        } catch(error){
            throw createError("500","MongoDB Error. "+error);
        }
    },
}

module.exports = controller;