const jwt = require("jsonwebtoken")
const secret_key = "garmsvcomand"
const auth = async(req,res,next)=>{
    if(req.method === "GET"){
        return next()
    }
    const token = await req.headers.authorization.split(" ")[1]
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpb3NvdWx1a291QGdtYWlsLmNvbSIsImlhdCI6MTcwMDkxNDk2NCwiZXhwIjoxNzAwOTk3NzY0fQ.Wz9Hgb8lZLDrO7bhJ70y-h5E0mdLsGnvxnHURa-WAcw"
    if(!token){
        return res.status(400).json({message:"トークンがありません"})
    }
    try{
        const decoded = jwt.verify(token,secret_key)
        console.log(decoded)
        //req.body.email = decoded.email
        return next()
    }catch(err){
        return res.status(400).json({message:"トークンが正しくありません。ログインしてください"})
    }
}

module.exports = auth