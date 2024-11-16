const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();
mongoose.Promise = global.Promise;

const DB_URL = process.env.MONGODB_URI;
const db = {
    mongoose: mongoose,
    url: DB_URL,
    books: require("./books")(mongoose),
    customer: require("./customers")(mongoose)
}

module.exports = db;