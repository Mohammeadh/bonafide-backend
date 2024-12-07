const express=require('express')
const router=express.Router()
const notifyController=require('./notifyController')
const hodNotify=require('./hodNotify')

router.post("/tutor",notifyController)
router.post("/hod",hodNotify)

module.exports=router;