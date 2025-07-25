const express= require("express")
const route= express.Router();
const userschema= require("../schema/user")
const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")

route.post("/register",async(req,res)=>{
   try {
     const {email,password,role}= req.body
     
    //  make a only one admin with email: registrytimetableexamination@gmail.com
     if (role==="admin"){
      const checkteacher= await userschema.findOne({role:"admin"})
      if(checkteacher){
        return res.status(400).json({message:"cannot have multiple admin"})
      }
     if(email!="registrytimetableexamination@heraldcollege.edu.np"){
        return res.status(400).json({message:"incorrect email for admin "})
     }
     }

     
    if(!email.endsWith("@heraldcollege.edu.np")){
      return  res.status(404).json({message:"please use college email"})
    }
    const checkemail= await userschema.findOne({email})
    if(checkemail){
       return res.status(404).json({message:"this email is already taken"})
    }
    const decrpypassword= await bcrypt.hash(password,10)
    const newuser= new userschema({
        email,
        password:decrpypassword,
        role:role || "student"
    })     
    await newuser.save();
    res.status(200).json({message:newuser})
   } catch (error) {
    return  res.status(404).json({message:"error to register"})
   }
})

route.post("/login",async(req,res)=>{
    try {
        const {email,password}= req.body
        const checkemail= await userschema.findOne({email})
        if(!checkemail){
           return  res.status(404).json({message:"could not find this email"})
        }
       const validpassword=  await bcrypt.compare(password,checkemail.password)
       if(!validpassword){
       return  res.status(404).json({message:"incorrect password"})
       }
         const accessToken=  jwt.sign({id:checkemail._id, role:checkemail.role },process.env.ACCESS_TOKEN_SECRET_KEY,{
            expiresIn:"10h"
          }) 
        res.status(200).json({message:"sucessfully login", token:accessToken})
    } catch (error) {
        return res.status(404).json({message:"error to login"})
    }
})

module.exports = route;
