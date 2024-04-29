const express=require('express')
const router=express.Router()
const {register,login,logout}=require('../controller/controller')

const isAuthenticated=(req,res,next)=>{
    const token=req.params.token
}

// router.get("/home",(req,res)=>{
//     res.send("Home")
// })
router.post("/Register",register)
router.post("/Login",login)
router.get("/logout",logout)


module.exports=router