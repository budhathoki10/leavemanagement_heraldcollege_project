const mongoose= require('mongoose')
const mathschema= mongoose.Schema({
    Modulename:{
        type:String,
        required:true,
    },
    Moduleleader:{
        type:String,
        default:"Uttam Acharya"
    }
})

const mathmodel = mongoose.model("Math",mathschema)
module.exports= mathmodel