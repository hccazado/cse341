const Customer = require("../models/customers");
const Book = require("../models/books");
const utilities = require("../services/utilities");

controller = {
    borrow: async (req, res, next) => {
        /*
            #swagger.description = Add a book objectId to customer's borrowedBooks after checking if the customer has already borrowed it.
        */
        const customerId = req.params.customerid;
        const bookId = req.params.bookid;
        
        if(!utilities.validateObjectId(customerId)){
            return next({message:"Must provide a valid customer id",statusCode: 401});
        }
        if(!utilities.validateObjectId(bookId)){
            return next({message:"Must provide a valid book id",statusCode: 401});
        }

        const customer = await Customer.findById(customerId);
        const book = await Book.findById(bookId);

        if(customer && book){
            if(utilities.hasBook(customer, book) == false && book.availableQuantity >= 1){
                
                customer.borrowedBooks.push(book._id);
                let newAvaliableQty = --book.availableQuantity;
                book.availableQuantity = newAvaliableQty;

                const newCustomer = await customer.save();
                const newBook = await book.save();

                if(newCustomer == customer && newBook == book){
                    res.sendStatus(204);
                }
                else{
                    return next({message: "Something went wrong borrowing customer's book"});
                }
            }
            else{
                return next({message: "Book unavailable or customer already have this book"});
            }
        }
        else{
            return next({message: "Couldn't find customer or book", statusCode: 404});
        }
    },
    returnBook: async (req, res, next) => {
        /*
            #swagger.description = Executes the process of returning a borrowed book from a customer
        */
        const customerId = req.params.customerid;
        const bookId = req.params.bookid;
        
        if(!utilities.validateObjectId(customerId)){
            return next({message:"Must provide a valid customer id",statusCode: 401});
        }
        if(!utilities.validateObjectId(bookId)){
            return next({message:"Must provide a valid book id",statusCode: 401});
        }

        const customer = await Customer.findById(customerId);
        const book = await Book.findById(bookId);

        if(customer && book){
            if(utilities.hasBook(customer, book)){
                customer.borrowedBooks.pull(book._id);
                let newAvailableQty = ++book.availableQuantity ;
                book.availableQuantity = newAvailableQty;

                const newCustomer = await customer.save();
                const newBook = await book.save();

                if (newCustomer == customer && newBook == book){
                    res.sendStatus(204);
                }
                else{
                    return next({message: "Something went wrong returning customer's book"});
                }
            }
            else{
                return next({message: "Customer doesn't have this book", statusCode: 401});
            }
        }
        else{
            return next({message: "Couldn't find customer or book", statusCode: 404});
        }
    }
}

module.exports = controller;