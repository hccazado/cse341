const swaggerAutogen = require("swagger-autogen");

const doc = {
    info:{
        title: "library management",
        description: "A small library management API for managing books, customers and borrows."
    },
    host: "cse341-6f28.onrender.com",
    schemes: ["https"]
}

const outputFile = "./swagger-output.json";
const routes = ["./routes/index"];

swaggerAutogen(outputFile, routes, doc);