const db = require("../models");

const utilities = {
    validateObjectId: (id) =>{
        if(db.mongoose.isValidObjectId(id)){
            return true;
        } 
        return false
    },
    hasBook: (customer, book) => {
        let hasBook = false;
        customer.borrowedBooks.map(item =>{
            if(item.toString() == book._id.toString()){
                hasBook = true;
            }
        });
        return hasBook;
    }
}

module.exports = utilities;