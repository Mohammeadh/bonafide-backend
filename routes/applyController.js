const request=require('../config/requestSchema')
const savedRequest=require('../config/savedRequest')
const tutor =require('../config/TutorSchema')



const apply=async(req,res)=>{
    const {name,email,reason,department,year,Reg_no,Contents,Subject,Gender,father,tutors,cgpa,sem,mode}=req.body.data
    try{
        const verify3=await savedRequest.findOne({email})
        const verify1=await request.findOne({email})
        const verify2=await tutor.findOne({email})

        if(verify1 || verify2 || verify3){
            return res.status(200).json({message:"Progress"})
        }
        if(!verify1 && !verify3){
            const currentDate = new Date();

// Get the current date
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Months are zero-based
const yr = currentDate.getFullYear();
const dt=`${day}-${month}-${yr}`

            const response=await tutor.create({
                name,email,reason,Regno:Reg_no,Year:year,Department:department,Contents,Subject,Gender,father,tutor:tutors,
                cgpa:cgpa,sem:sem,mode:mode,date:dt
            })
            console.log(year)
                return res.status(200).json({message:response})
        }
      
    
    }
    catch(err){
        console.log("error")
        return res.status(200).json({message:err})
    }
  
    
}

module.exports=apply