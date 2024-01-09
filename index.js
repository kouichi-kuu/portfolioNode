const express = require("express")
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken")
//const auth = require("./utils/auth")

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const connectDB = require("./utils/database")
const {ItemModel,UserModel} = require("./utils/schemaModels")
//ITEM function

//Create Item
app.post("/item/create",async(req,res)=>{
    try{
        await connectDB()
        await ItemModel.create(req.body)
        return res.status(200).json({message:"アイテム作成成功"})
    }catch(err){
        return res.status(400).json({message:"アイテム作成失敗"})
    }
    
})

//Read All Item
app.get("/",async(req,res)=>{
    try{
        await connectDB()
        const allItems = await ItemModel.find()
        return res.status(200).json({
            message:"アイテム読み取り成功（オール）",
            allItems:allItems,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（オール）"})
    }
})

//Read item PHP
app.get("/item/php",async(req,res)=>{
    try{
        await connectDB()
        const phpItems = await ItemModel.find({program:'PHP'})
        return res.status(200).json({
            phpItems : phpItems,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（PHP）"})
    }
})

//Read item Javascript
app.get("/item/javascript",async(req,res)=>{
    try{
        await connectDB()
        const jsItem = await ItemModel.find({program:'Javascript'})
        return res.status(200).json({
            jsItem:jsItem,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（Javascript）"})
    }
})

//Read item MySQL
app.get("/item/mysql",async(req,res)=>{
    try{
        await connectDB()
        const sqlItem = await ItemModel.find({program:'MySQL'})
        return res.status(200).json({
            sqlItem:sqlItem,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（MySQL）"})
    }
})

//Read item HTML・CSS
app.get("/item/html",async(req,res)=>{
    try{
        await connectDB()
        const htmlItem = await ItemModel.find({program:'HTML・CSS'})
        return res.status(200).json({
            htmlItem:htmlItem,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（HTML・CSS）"})
    }
})

//Read item Other
app.get("/item/other",async(req,res)=>{
    try{
        await connectDB()
        const otherItem = await ItemModel.find({program:'Other'})
        return res.status(200).json({
            otherItem:otherItem,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（Other）"})
    }
})

//Read new date Item
app.get("/item/newdate",async(req,res)=>{
    try{
        await connectDB()
        const newdateItem = await ItemModel.find({}).sort({update:-1}).limit(5)
        return res.status(200).json({
            message:"アイテム読み取り成功（最新アイテム）",
            newdateItem:newdateItem,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（最新アイテム）"})
    }
})

//Read Single Item
app.get("/item/:id",async(req,res)=>{
    try{
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        return res.status(200).json({
            message:"アイテム読み取り成功（シングル）",
            singleItem:singleItem,
        })
    }catch(err){
        return res.status(400).json({message:"アイテム読み取り失敗（シングル）"})
    }
})

//Update Item
app.put("/item/update/:id",async(req,res)=>{
    console.log(req)
    try{
        await connectDB()
        await ItemModel.updateOne({_id:req.params.id},req.body)
        return res.status(200).json({message:"アイテム読み取り成功（シングル）",singleItem:singleItem})
    }catch(err){
        return res.status(400).json({message:"アイテム編集失敗"})
    }
})

//Delete Item
app.delete("/item/delete/:id",async(req,res)=>{
    try{
        await connectDB()
        await ItemModel.deleteOne({_id:req.params.id})
        return res.status(200).json({message:"アイテム削除成功"})
    }catch(err){
        return res.status(400).json({message:"アイテム削除失敗"})
    }
})

//USER function

//Register User
app.post("/user/register",async(req,res)=>{
    try{
        await connectDB()
        await UserModel.create(req.body)
        return res.status(200).json({message:"ユーザー登録成功"})
    }catch(err){
        return res.status(400).json({message:"ユーザー登録失敗"})
    }
})

//Login User
const secret_key = "mern"
app.post("/user/login",async(req,res)=>{
    try{
        await connectDB()
        const savedUserData = await UserModel.findOne({email:req.body.email})
        if(savedUserData){
            if(req.body.password === savedUserData.password){
                const payload = {
                    email:req.body.email,
                }
                const token = jwt.sign(payload,secret_key,{expiresIn:"23h"})
                console.log(token)
                return res.status(200).json({message:"ログイン成功",token:token})
            }else{
                return res.status(400).json({message:"ログイン失敗パスワードが違います"})
            }
        }else{
            return res.status(400).json({message:"ログイン失敗ユーザー登録をしてください"})
        }
    }catch(err){
        return res.status(400).json({message:"ログイン失敗"})
    }
})

//Connecting to port
const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Listening on localhost port ${port}`)
})

// app.listen(5000,()=>{
//     console.log("listen localhost port 5000")
// })