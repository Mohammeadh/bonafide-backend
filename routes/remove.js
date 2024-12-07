const express=require('express')
const router=express.Router()
const tutors=require('../config/TutorSchema')

router.post("/",async(req,res)=>{
    const regno=req.body.data.regno
    try{
        const del=await tutors.deleteOne({Regno:regno})
        console.log(del)
        return res.status(200).json({message:del})
    }
    catch(err){
        console.log(err)
        return res.status(200).json({error:err})
    }

})



module.exports=router