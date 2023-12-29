const mongoose = require("mongoose")
const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://riosoulukou:gizasoul0077@cluster0.ts95uva.mongodb.net/portfolioDataBase?retryWrites=true&w=majority")
        console.log("Success: Connect to MongoDB")
    }catch(err){
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}
module.exports = connectDB