const {MongoClient} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URI;

let _db;

const initDb = callback =>{
    if(_db){
        console.log("DB already initialized");
        return callback(null, _db);
    }
    MongoClient.connect(DB_URL,).then((client)=>{
        _db = client;
        callback(null, _db);
    }).catch(error =>{
        callback(error);
    });
};

const getDb = () =>{
    if(!_db){
        throw Error("DB not initialized");
    }
    return _db;
}

module.exports ={
    initDb,
    getDb
}