const express=require('express')
const router=express.Router()
const passport=require('passport')
const {register,login,logout,getTasks,addNewTask,deleteTask}=require('../controller/controller')

const isAuthenticated=(req,res,next)=>{
    const token=req.params.token
}

router.get("/home",(req,res)=>{
    res.send('<a href="/auth/google">Login with google</a>')
})
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { session:false,failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
//   router.get('/auth/google/callback',(req,res)=>{
//     console.log("Hi")
//     res.json({Message:"Message"})
// }) 

router.get("/auth",(req,res)=>{
    res.send("Reached")
})
router.post("/Register",register)
router.post("/Login",login)
router.get("/logout",logout)
router.get("/task/getTasks/:id",getTasks)
router.post("/task/add",addNewTask)
// router.patch("/task/:id",updateTask)
router.post("/task/delete/:id",deleteTask)


module.exports=router