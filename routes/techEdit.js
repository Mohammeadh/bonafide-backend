const express=require('express')
const router=express.Router()
const tutorList=require('../config/tutorList')
const user=require('../config/loginSchema')

router.get("/edit",async(req,res)=>{
    try{
    const record=await tutorList.find({})
    return res.status(200).json({mesaage:record})
 
    }
    catch(err){
        return res.status(200).json({error:err})
    }
    })

    router.post("/edit",async(req,res)=>{
        try{
            const{name,email}=req.body.data
        const record=await tutorList.create({name,email,role:"tutor"})
        return res.status(200).json({mesaage:record})
        }
        catch(err){
            console.log(err)
            return res.status(200).json({error:err})
        }
        })

router.post("/remove",async(req,res)=>{
    const email=req.body.data.email
    try{
        const d1=await tutorList.deleteOne({email})
        return res.status(200).json({mesaage:"Deleted Sucessfully"})
    }
    catch(err){
        return res.status(200).json({error:err})
    }
 
})

router.post("/add",async(req,res)=>{
    const email=req.body.data.email
    const name=req.body.data.name
    const password=req.body.data.password
    try{ 
        const available=await user.findOne({email:email})
        const tut=await tutorList.findOne({email})
     
        if (tut)
        {
            return res.status(200).json({message:"Already exist"})
        }
        if(available)
        {
            return res.status(200).json({message:"Only for Student"})
        }


        if(!available)
        {
            const d2=await tutorList.create({name,email,role:"tutor",password:password})
            return res.status(200).json({mesaage:"Added Sucessfully"})

        }
        return res.status(200).json({message:"Failed To Add Tutor"})
  
    }
    catch(err){
        return res.status(200).json({error:err})
    }
 
})
    

module.exports=router