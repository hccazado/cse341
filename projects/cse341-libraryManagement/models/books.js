const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
    title: {type: String, required: true},
    isbn: {type: String, required: true},
    author: {type: [String]},
    category: {type: String},
    quantity: {type: Number},
    availableQuantity: {type: Number}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Book", bookSchema);