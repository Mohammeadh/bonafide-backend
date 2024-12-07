const express=require('express')
const router=express.Router()
const request=require('../config/requestSchema')
const savedRequest=require('../config/savedRequest')
const tutor=require('../config/TutorSchema')
const tutors=require('../config/TutorSchema')

router.post("/",async(req,res)=>{
    const email=req.body.data.email
try{
const v1=await request.findOne({email})
const v2=await savedRequest.findOne({email})
const v3=await tutor.findOne({email})
if(v1){
    const detials=await request.findOne({email})
    return res.status(200).json({message:"Progress in Hod",detials:detials})
}
if(v2){
    const detials=await savedRequest.findOne({email})
    return res.status(200).json({message:"Progress in technician",detials:detials})
}
if(v3){
    const detials=await tutors.findOne({email})
    return res.status(200).json({message:"Progress in Tutor",detials:detials})
}
else{
    return res.status(200).json({message:"not in progress"})
} 
}
catch(err){
console.log(err)
return res.status(200).json({message:err})
}

})

module.exports=router