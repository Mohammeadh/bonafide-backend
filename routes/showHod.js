const express=require('express')
const router=express.Router()
const users=require('../config/loginSchema')

router.get("/",async(req,res)=>{
     const response=await user.findOne()
})