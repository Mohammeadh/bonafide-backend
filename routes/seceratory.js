const express = require('express')
const router = express.Router()
const tutor = require('../config/TutorSchema')
const hod = require('../config/requestSchema')
const tech = require('../config/savedRequest')

router.get("/", async (req, res) => {
    try {
        const tutor_data = await tutor.find({}).sort({ _id: -1 })
        const hod_data = await hod.find({}).sort({ _id: -1 })
        const tech_data = await tech.find({}).sort({ _id: -1 })
        res.status(200).json({ tutor_data, hod_data, tech_data })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})

router.post("/reject", async (req, res) => {
    try {
        const { email, role } = req.body.data
        if (role=="Tutor"){
            await tutor.deleteOne({ email: email })
            return res.status(200).json({ message: "Deleted Sucessfully" })
        }
        if (role=="Hod"){
            await hod.deleteOne({ email: email })
            return res.status(200).json({ message: "Deleted Sucessfully" })
        }
        else{
            await tech.deleteOne({ email: email })
            return res.status(200).json({ message: "Deleted Sucessfully" })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router