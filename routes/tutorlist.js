const express=require('express')
const router=express.Router()
const tutorList=require('../config/tutorList')

router.get("/",async(req,res)=>{
    try{
        const response=await tutorList.find({},{password:0}) 
        return res.status(200).json({message:response})
    }
    catch(err){
       return res.status(200).json({errror:err})
    }

})

module.exports=router 