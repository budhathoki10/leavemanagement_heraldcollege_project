const leavedetail= require("../../schema/leavedetail")
const creeate= async (req,res)=>{
const { student_name, level, email, leavetype, description,leaveday,totalleaveday} = req.body;
// declare image_data (base 64) as null
let image_data = null;
// if file exists
// convert to base 64
// req.file.mimetype means what type of file is sending
if (req.file) {
  image_data = {
    data: req.file.buffer.toString('base64'),
    contentType: req.file.mimetype
  };
}

    const checkexisting_student= await leavedetail.findOne({email})
        if(checkexisting_student){
        const updated_total_leavetaken= leaveday+ checkexisting_student.totalleaveday
        const cantake_max_leave= 8
        const leavepercentage= (updated_total_leavetaken/cantake_max_leave)*20
        const percentage= 100-leavepercentage
        // if % <80 and check file exit or not
        if(percentage<80 && !req.file){
            
           return res.status(400).json({
            message: `You are below 80%. Please upload a document to support your ${leavetype} leave request.`,
        });
    }
            checkexisting_student.email=email
            checkexisting_student.leaveday = leaveday; 
            checkexisting_student.leavetype = leavetype;
            checkexisting_student.description = description;
            // if file exists name it as its orginal name otherwise name it aS NO NEED OF IMAGE
            checkexisting_student.image = req.file?.originalname || "no need of image";
            // if base 64 exit save it otherwise save null
             checkexisting_student.image_data= image_data 
            checkexisting_student.status="pending"
            
            await checkexisting_student.save()
            return res.status(200).json({message:`sucessfully send leave for ${leaveday} day. please wait for admin resposne. we will notify you via email `}) 
        }
        else{
        const takenleave= leaveday
        const cantake_max_leave= 8
        const leavepercentage= (takenleave/cantake_max_leave)*20
        const percentage= 100-leavepercentage
        // same as above check the % and file if exits or not 
        if(percentage<80 && !req.file){
           return res.status(400).json({
            message: `You are below 80%. Please upload a document to support your ${leavetype} leave request.`,
        });
        }
            const newuser= new leavedetail({
            student_name,
            level,
            email,
            leaveday,
            totalleaveday,
            leavetype,
            
            image: req.file?.originalname || "no need of image",
            image_data: image_data,
            description

        })     
        await newuser.save()
        res.status(200).json({message:`sucessfully send leave for ${leaveday} day. please wait for admin resposne. we will notify you via email `,data:newuser})   
        
        }
        }

module.exports= creeate