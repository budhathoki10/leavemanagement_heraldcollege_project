const leavedetail= require("../../schema/leavedetail")
const nodemailer= require('nodemailer')
const viewpendingleaves= async (req,res)=>{

    try {
        const views= await leavedetail.find({status:"pending"}).sort({createdAt:-1})
        if(views.length===0){
           return res.status(404).json({message:"no more pending request"})
        }

    const filter= {}
    const {status}= req.query;
        if (status) {
            filter.status = status;
            const filteredViews = await leavedetail.find(filter).sort({createdAt:-1});
            res.status(200).json({leaves:filteredViews});
        }
        else{
            res.status(200).json({leaves:views});
        }

       
    } catch (error) {
        return res.status(404).json({message:"cannot view"})
    }
}

const update= async(req,res)=>{
    const {status}=req.body

    const {id}= req.params

    const checkid= await leavedetail.findById(id)
    
    if(!checkid){
        return res.status(404).json({message:"cannot find this id "})
    }

    const updatedata= {
            status,
            reviewby:"registrytimetableexamination@gmail.com",
    }

    if(status==="approve"){
        updatedata.$inc={
            totalleaveday:checkid.leaveday
        }
    }
    const updates= await leavedetail.findByIdAndUpdate(
        id,
            updatedata
        ,
        {new:true}
    )
    if(!updates){
         return  res.status(404).json({message:"cannot update"})
    }


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'registrytimetableexamination@gmail.com',
        pass: 'wkls wjif rekm vsrb'
    }
});

const mailOptions = {
    from: 'registrytimetableexamination@gmail.com',
    to: `${checkid.email}`,
    subject: 'Leave Application reply',
    text: `Dear ${checkid.student_name},

We would like to inform you that your application has been ${updates.status}.

Thank you for notifying us

Best regards,
Herald college, Kathmandu 
`
};

// sending mail
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred: ', error);
    } else {
        console.log('Email sent: ', info.response);
    }
});
}

module.exports={viewpendingleaves,update}