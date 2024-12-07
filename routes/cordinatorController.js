const savedrequest=require('../config/savedRequest')
const request=require('../config/requestSchema')

const acceptController=async(req,res)=>{

    const{name,email,reason,department,year,regNo,gender,father,tutor,cgpa,sem,mode}=req.body.data
    try{
        console.log(tutor)

        const verify=await savedrequest.findOne({email})
        if(verify){
            return res.status(200).json({message:"request already submitted"})
        }
        else{
            const response=await savedrequest.create(
                {
                    name:name,
                    email:email,
                    reason:reason,
                    department:department,
                    year:year,
                    regNo:regNo,
                    Gender:gender,
                    Father:father,
                    tutors:tutor,
                    cgpa:cgpa,
                    sem:sem,
                    mode:mode
                }
                   )
                   await request.deleteOne({email})
                   res.status(200).json({message:response})
        }
       

    }
    catch(err){
        console.log(err)
        res.status(200).json(err)
    }
   
}
const rejectController=async(req,res)=>{

    const email=req.body.data.email
    try{
        await request.deleteOne({email})
        res.status(200).json({message:"Rejected"})
    }
    catch(err){
        console.log(err)
        res.status(200).json(err)
    }
   
}

module.exports={acceptController,rejectController}