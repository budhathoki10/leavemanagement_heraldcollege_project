const mongoose= require('mongoose')
let userdetail= mongoose.Schema({
    
    email:{
         type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","teacher"],
        default:"student"
    }
})

module.exports= mongoose.model("userdetails",userdetail)