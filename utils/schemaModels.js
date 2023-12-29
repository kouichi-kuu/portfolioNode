const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    program:String,
    ruby:String,
    update:String,
    image:String,
    title:String,
    text:String,
})

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
})

exports.ItemModel = mongoose.model("Item",ItemSchema)
exports.UserModel = mongoose.model("User",UserSchema)