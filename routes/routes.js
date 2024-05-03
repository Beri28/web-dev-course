const express=require('express')
const router=express.Router()
const {register,login,logout,getTasks,addNewTask,deleteTask}=require('../controller/controller')

const isAuthenticated=(req,res,next)=>{
    const token=req.params.token
}

// router.get("/home",(req,res)=>{
//     res.send("Home")
// })
router.post("/Register",register)
router.post("/Login",login)
router.get("/logout",logout)
router.get("/task/getTasks/:id",getTasks)
router.post("/task/add",addNewTask)
// router.patch("/task/:id",updateTask)
router.post("/task/delete/:id",deleteTask)


module.exports=router