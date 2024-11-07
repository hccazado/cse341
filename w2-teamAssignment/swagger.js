const swagggerAutogen = require("swagger-autogen")();

const doc = {
    info:{
      title: "Temples API",
      description: "A Rest API of LDS temples"
    },
    host: "localhost:8080"
  };

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

// swagggerAutogen(outputFile, routes, doc);

// Generates a new API Documentation and starts the server

async function startServer(outputFile, routes, doc){
    const result = await swagggerAutogen(outputFile, routes, doc);
    if(result.success){
        import("./index.js");
    }
}

startServer(outputFile, routes, doc);

