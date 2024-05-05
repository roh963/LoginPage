const mongoose = require('mongoose');

const MONGO_URL = process.env.DB||"mongodb://localhost:27017/user";
// const MONGO_URL = "mongodb://localhost:27017/user";


const databaseconnect = ()=>{
    mongoose
           .connect(MONGO_URL)
           .then((conn)=>console.log(`Connected to Db :${conn.connection.host}`))
           .catch((error)=>console.log(error.message))
}
module.exports= databaseconnect;