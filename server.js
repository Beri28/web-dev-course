const express=require('express');
const app=express();
const router=require('./routes/routes')
const dotenv=require('dotenv').config()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const passport=require('passport')
const auth=require('./controller/google-auth')

mongoose.connect(process.env.mongoURI).then(()=>{
    console.log("Connected to db succesfully")
}).catch(()=>{
    console.log("Error connecting to db")
})

app.use(cors({
    origin:['http://127.0.0.1:5173','http://localhost:5173'],
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({}))
app.use(cookieParser())
app.use(express.static("./frontend/dist"))

app.use(router)
app.use('/*',(req,res)=>{
    res.sendFile('index.html',{root:'./frontend/dist'})
})


app.listen(5000,()=>{
    console.log("Server is listening on port 5000")
})