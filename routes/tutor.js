const express = require('express')
const router = express.Router()
const tutor = require('../config/TutorSchema')
const request = require('../config/requestSchema')
const sendreason=require('./sendreason')


router.get("/", async (req, res) => {
    try {
        const record = await tutor.find({})
        return res.status(200).json({ mesaage: record }).sort({ _id: -1 });
    }
    catch (err) {
        console.log(err)
        return res.status(200).json({ error: err })
    }
})



router.post("/reject", async (req, res) => {
    try {
        const email = req.body.data.email
        await tutor.deleteOne({ email })
        return res.status(200).json({ message: "Deleted Successfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(200).json({ error: err })
    }
})

router.post("/accept", async (req, res) => {
    try {
        const { id, name, email, reason, department, year, regNo, Contents, Subject, Gender, father,cgpa,sem,mode} = req.body.data
    
        await tutor.deleteOne({ email })
        const hod_data = await request.create({ name: name, email: email, reason: reason, department: department, year: year, regNo: regNo, Subject: Subject, Gender: Gender, Contents: Contents, Father: father, tutors: req.body.data.tutor,cgpa:cgpa,sem:sem,mode:mode})
        return res.status(200).json({ mesaage: hod_data,info:"sucess" })
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ error: err })
    }
})

//sendind reason to the student

router.post("/send",sendreason)

module.exports = router