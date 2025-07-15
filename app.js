const express =require('express')
const mongoose= require("mongoose")
const loginsignup= require("./loginsignup/loginsignup")
const routing= require('./router/route')
let app =express()
app.use(express.json())
require("dotenv").config()
mongoose.connect(process.env.MONGO_URl).then(()=>{
    console.log("sucessfully connect to the mongodb");
}).catch(()=>{
    console.log("error to connect in mongodb");
})

app.use("/api/user",loginsignup)
app.use("/api/task",routing)

app.listen(5000,()=>{
    console.log("sucessfully connected to server");
})