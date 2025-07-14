const mongoose= require('mongoose')
let leavedetail= mongoose.Schema({
    student_name:{
        type:String,
        required:true
    },

    level:{
        type:Number,
        required:true
    },

    email:{
         type:String,
        required:true
    },
    leaveday:{
        type:Number,
        default:1,
        required:true
    },

    totalleaveday:{
        type:Number,
        default:0
    },

    leavetype:{
        type:String,
        default:"normal",
        required:true
    },  
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approve","reject"],
        default:"pending"
    },

    reviewby:{
        type:String,
        default:null
    },
},

{timestamps:true})

module.exports= mongoose.model("leaveinformation",leavedetail)