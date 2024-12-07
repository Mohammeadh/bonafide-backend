const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const user=require('../config/loginSchema')
const tutorList=require('../config/tutorList')

router.post("/",async(req,res)=>{
const token=req.body.data.token

if(token===null){
    return res.status(200).json({message:"Token not recieved"})
}
try{
    const decoded = jwt.verify(token,"secert");
    const id=decoded.id
    const detials=await user.findById(id)
    const tutor=await tutorList.findById(id)
    if(detials){
        return res.status(200).json({message:detials.role})
    }
    if(tutor){
        return res.status(200).json({message:tutor})
    }

}
catch(err){
    console.log("error occured")
    return res.status(200).json({error:err})
}
})


module.exports=router