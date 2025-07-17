let express= require('express')
const routing= express.Router()
const upload= require("../multer/multer")
const {auth,isteacher}= require("../verify/verify")
const studentcontrol= require("../controller/studentcontroller/control")

const {viewpendingleaves,update}= require("../controller/teachercontroller/teachercontrol")
// upload the file with key file. single helps to post only one image only 
routing.post("/create",auth, upload.single("myfile"), studentcontrol)

// teacher
routing.get("/viewleave",auth,isteacher, viewpendingleaves)
routing.put("/updateleave/:id",auth,isteacher,update)

module.exports= routing