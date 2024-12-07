const express=require('express')
const router=express.Router()
const {codeController}=require('./codeController')

router.post("/",codeController)

module.exports=router