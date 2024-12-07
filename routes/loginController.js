const bcrypt = require('bcrypt')
const user = require('../config/loginSchema')
const storage = require('node-sessionstorage')
const jwt = require('jsonwebtoken')
const tutorList = require('../config/tutorList')



const login = async (req, res) => {
    const { email, password } = req.body.data
    const verify = await user.findOne({ email })
    const tutor_verify = await tutorList.findOne({ email })
    if (tutor_verify) {
        if (tutor_verify.password == password) {
            return res.status(200).json({ message: "user logined", verify: tutor_verify, token: generateToken(tutor_verify.id) })
        }
        else {
            return res.status(200).json({ message: "incorrect password or email" })
        }
    }
    if (!verify) {
        res.status(200).json({ message: "user not found" })
    }
    if (verify) {
        const access = await bcrypt.compare(password, verify.password)
        console.log(access)
        if (!access) {
            console.log(verify)
            res.status(200).json({ message: "incorrect password or email" })
        }
        else {
            res.status(200).json({ message: "user logined", verify, token: generateToken(verify.id) })
        }
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body.data
    //    const c_code= storage.getItem("otp")
    //    const cookie_code=c_code.split("#")[0]
    //    const verify_mail=c_code.split("#")[1]
    //    console.log( verify_mail)
    //    console.log(cookie_code)
    //    console.log(code)
    const verify = await user.findOne({ email })
    if (verify) {
        return res.status(200).json({ message: "user already exists" })
    }
    //    if(code==cookie_code && email==verify_mail){
    if (name != "" && email != "" && password != "") {
        if (email == "hodit@psnacet.edu.in") {
            const hash_pass = await bcrypt.hash(password, 10)
            const response = await user.create({
                name,
                email,
                password: hash_pass,
                role: "hod"
            })
            return res.status(200).json({ message: "registered successfully" })
        }

        if (email == "venkatit@psnacet.edu.in") {
            const hash_pass = await bcrypt.hash(password, 10)
            const response = await user.create({
                name,
                email,
                password: hash_pass,
                role: "adminHod"
            })
            return res.status(200).json({ message: response })
        }

        
        if (email == "Secretary_it@psnacet.edu.in") {
            const hash_pass = await bcrypt.hash(password, 10)
            const response = await user.create({
                name,
                email,
                password: hash_pass,
                role: "seceratory"
            })
            return res.status(200).json({ message:"registered successfully",role:"seceratory" })
        }

        if (email == "padmanabanv@psnacet.edu.in" || email == "prabhu@psnacet.edu.in" || email == "jsjeralld@psnacet.edu.in") {
            const hash_pass = await bcrypt.hash(password, 10)
            const response = await user.create({
                name,
                email,
                password: hash_pass,
                role: "cordinator",

            })
            return res.status(200).json({ message: "registered successfully" })
        }


        const mail = email.split('@')[1]
        const hash_pass = await bcrypt.hash(password, 10)
        if (mail == 'psnacet.edu.in') {
            const response = await user.create({
                name,
                email,
                password: hash_pass,
                role: "student"
            })
            return res.status(200).json({ message: "registered successfully" })



        }
    }
    else {
        return res.status(200).json({ message: "Registered Failed" })
    }
}
const generateToken = (id) => {
    return jwt.sign({ id }, "secert", {
        expiresIn: '15d',
    })
}

module.exports = { login, register }