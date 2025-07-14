const leavedetail= require("../../schema/leavedetail")
const creeate= async (req,res)=>{
    const { student_name, level, email, leavetype, description,leaveday,totalleaveday} = req.body;
    const checkexisting_student= await leavedetail.findOne({email})
        if(checkexisting_student){
        const updated_total_leavetaken= leaveday+ checkexisting_student.totalleaveday
        const cantake_max_leave= 8
        const leavepercentage= (updated_total_leavetaken/cantake_max_leave)*20

        const percentage= 100-leavepercentage

        if(percentage<80){
            return res.status(404).json({message:`you cannot takae leave. your present percentage is ${percentage}%. you have 
                already take ${leavepercentage}% leave`})
        }
            checkexisting_student.email=email
            checkexisting_student.leaveday = leaveday; 
            checkexisting_student.leavetype = leavetype;
            checkexisting_student.description = description;
            checkexisting_student.status="pending"
            await checkexisting_student.save()
            return res.status(200).json({message:`sucessfully send leave for ${leaveday} day. please wait for admin resposne. we will notify you via email `}) 
        }
        
        else{
            const takenleave= leaveday
        const cantake_max_leave= 8
        const leavepercentage= (takenleave/cantake_max_leave)*20
        const percentage= 100-leavepercentage
        if(percentage<80){
            return res.status(404).json({message:`you cannot takae leave. your present percentage is ${percentage}%. you have 
                already take ${leavepercentage}% leave`})
        }
        
        const newuser= new leavedetail({
            student_name,
            level,
            email,
            leaveday,
            totalleaveday,
            leavetype,
            description
        })     
        await newuser.save()
        res.status(200).json({message:`sucessfully send leave for ${leaveday} day. please wait for admin resposne. we will notify you via email `,data:newuser}) 

            
        }
        }

module.exports= creeate