const express=require('express')
const router=express.Router()
const history=require('../config/historySchema')
const user=require('../config/loginSchema')
const savedrequest=require('../config/savedRequest')
const tutor=require('../config/TutorSchema')
const hod=require('../config/requestSchema')


router.post("/",async(req,res)=>{
    const{name, year, department, reason, reg, father,cgpa,sem,gen,mode,email}=req.body.data
    console.log(email)
    
   try{
    const currentDate = new Date();
    const years = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formalDate = `${day}-${month}-${years}`;
     
    const his=await history.create({
        name, year, department, reason, reg, father,cgpa,date:formalDate,sem:sem,gender:gen,mode:mode
       }) 


       try{

           await savedrequest.deleteOne({email:email})
           console.log("deleted sucessfully")
       }
       catch(err)
       {
        console.log("Error")
       }
       try{

        await tutor.deleteOne({email:email})
    }
    catch(err)
    {
     console.log("Error")
    }
    try{

        await hod.deleteOne({email:email})
    }
    catch(err)
    {
     console.log("Error")
    }






       return res.status(200).json({message:his})
   }
   catch(err){
    console.log(err)
    return res.status(500).json({message:"failed to Add history",err})
   }
  
})

router.get("/",async(req,res)=>{
    try{
        const data=await history.find({})
        return res.status(200).json({message:data})
    }
    catch(err)
    {
        return res.status(500).json({error:err})
    }

})

router.get("/removeHistory",async(req,res)=>
{
    try{
        await history.deleteMany({})
        return res.status(200).json({message:"History deleted"})
    }
    catch(err)
    {
        return res.status(200).json({error:"History deleted failed"}) 
    }
})


router.get("/removeUser",async(req,res)=>
{
    try{
        await user.deleteMany({})
        return res.status(200).json({message:"user deleted"})
    }
    catch(err)
    {
        return res.status(200).json({error:"user deleted failed"}) 
    }
})



module.exports=router
