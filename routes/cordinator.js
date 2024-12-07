const express=require('express')
const router=express.Router()
const savedRequest=require('../config/savedRequest')

router.get("/",async(req,res)=>{
    try{
        const data= await savedRequest.find()
        return res.status(200).json({data:data})
    }
    catch(err){
        return res.status(200).json({message:"err occured",err})
    }
  
})

router.post("/",async(req,res)=>{
    try{
        const email= req.body.data.email;
        const verify=await savedRequest.findOne({email})
        if(verify){
            const response=await savedRequest.deleteOne({email})
            return res.status(200).json({message:response})
        }
        else{
            return res.status(200).json({message:"Request Not found"})
        }
      
    }
    catch(err){
        return res.status(200).json({message:"err occured",err})
    }
  
})


module.exports=router