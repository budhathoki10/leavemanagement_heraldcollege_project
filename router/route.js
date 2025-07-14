let express= require('express')
const routing= express.Router()
// const {auth,isteacher}= require("../verify/verify")
const {auth,isteacher}= require("../verify/verify")
const studentcontrol= require("../controller/studentcontroller/control")

const {viewpendingleaves,update}= require("../controller/teachercontroller/teachercontrol")
routing.post("/create",auth,studentcontrol)

// teacher
routing.get("/viewleave",auth,isteacher, viewpendingleaves)
routing.put("/updateleave/:id",auth,isteacher,update)

module.exports= routing