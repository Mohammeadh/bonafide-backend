const express=require('express')
const router=express.Router()
const hodController=require('./hodController')
const {acceptController,rejectController}=require('./cordinatorController')


router.get("/",hodController)
router.post("/accept",acceptController)
router.post("/reject",rejectController)

module.exports=router