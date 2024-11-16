const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerSchema = new schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    dob: {type: String, required: true},
    borrowedBooks: [
            {type: schema.Types.ObjectId, ref: "Book"}
    ]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Customer", customerSchema);