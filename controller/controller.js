const userSchema=require('../model/user')
const jwt=require('jsonwebtoken')

const maxAge=3600*24
const createToken=(id,username)=>{
    return jwt.sign({id,username},process.env.Secret,{expiresIn:maxAge})
}


const register=async(req,res)=>{
    try{
        let {username,email,password}=req.body
        let newUser=await userSchema.create({username,email,password})
        if(newUser){
            let token=createToken(newUser._id,newUser.username)
            res.cookie("authApp",token,{maxAge:1000*maxAge})
            res.json({User:newUser.username,ID:newUser._id,token:token})
            return
        }
        throw Error("Couldn't register user")
    }
    catch(error){
        console.log(error.message)
        res.json({Error:error.message})
    }
}
const login=async(req,res)=>{
    try{
        let {email,password}=req.body
        let user=await userSchema.login(email,password)
        if(user){
            let token=createToken(user._id,user.username)
            res.cookie("authApp",token,{maxAge:1000*maxAge})
            res.json({User:user.username,ID:user._id,token:token,tasks:user.tasks})
            return
        }
        res.json({User:null})
    }catch (error){
        console.log(error.message)
        res.json({Error:error.message})
    }
}
const logout=(req,res)=>{
    try {
        res.cookie("authApp",'',{maxAge:500})
        res.json({Message:'Ok'})
    } catch (error) {
        res.json({Error:error.message})
    }
}
const getTasks=async(req,res)=>{
    try{
        let user=await userSchema.findOne({_id:req.params.id})
        res.json({tasks:user.tasks})
    }catch(error){
        console.log(error.message)
        res.json({Error:error.message})
    }
}
const addNewTask=async (req,res)=>{
    try{
        let {userId,tasks}=req.body 
        let user=await userSchema.findOneAndUpdate({_id:userId},{$set:{tasks:tasks}})
        res.json({User:user.username,ID:user._id,tasks:user.tasks})

    }catch(error){
        console.log(error.message)
        res.json({Error:error.message})
    }
}
const deleteTask=async (req,res)=>{
    try{
       let user=await userSchema.findOneAndUpdate({_id:req.params.id},{$set:{tasks:req.body.tasks}})
       res.json({User:user.username,ID:user._id,tasks:user.tasks})
    }catch(error){
        console.log(error.message)
        res.json({Error:error.message}) 
    }
}

exports.register=register
exports.login=login
exports.logout=logout
exports.getTasks=getTasks
exports.addNewTask=addNewTask
exports.deleteTask=deleteTask