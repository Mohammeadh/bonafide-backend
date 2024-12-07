const express=require('express')
const router=express.Router()
const apply=require('./applyController')

router.post("/",apply)

module.exports=router;