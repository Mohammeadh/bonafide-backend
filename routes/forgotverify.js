const express=require('express')
const router=express.Router()
const storage=require('node-sessionstorage')
const users=require('../config/loginSchema')
const bycrpt=require('bcrypt')
const tutor=require('../config/tutorList')


router.put("/",async(req,res)=>{
const email=req.body.data.email
const password=req.body.data.password

try{
    const verify=await users.findOne({email})
 
    const tutorCheck=await tutor.findOne({email})

    if(tutorCheck)
    {
        try{

            await tutor.deleteOne({email:email})
            await tutor.create({
                name:tutorCheck.name,email:email,password:password,role:tutorCheck.role
            })
            return res.status(200).json({message:`${tutorCheck.email} was Update sucessfully`})
        }
        catch(err)
        {
            return res.status(500).json({error:err})
        }
    }



    if(verify){
        const email=verify.email
        const id=verify.id
        if(id){
    const hash_pass=await bycrpt.hash(password,10)
        const updateUser=users.findOne({email})
        await users.deleteOne({email})
        console.log("deleted success")
        await users.create({
            name:verify.name,email:email,password:hash_pass,role:verify.role
        })
            console.log("created success")
          return res.status(200).json({status:"created sucessfully"})
        }
    }
    return res.status(200).json({error:"error occured"})
}
catch(err){
    console.log("last error",err)
    return res.status(200).json({error:err})
}


})


module.exports=router
