var nodemailer = require('nodemailer');
const express=require('express')
const router=express.Router()
const users=require('../config/loginSchema')
const CryptoJs=require('crypto-js')
const tutor=require('../config/tutorList')

router.post("/",async(req,res)=>{
    
    const email=req.body.data.email

    const verify=await users.findOne({email})
    const tutor_list=await tutor.findOne({email})

    if(verify || tutor_list){
        const mail=email.split('@')[1]
        if(mail==="psnacet.edu.in"){
          const code=Math.floor(Math.floor(
            Math.random() * (97868 - 48) + 62
          ))

          const key="bonafideforpsna123"
          const encryptedValue=(value)=>{
            return CryptoJs.AES.encrypt(value.toString(),key).toString()
          }
          const encrpt_data=encryptedValue(code)

            try{
              var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  port:465,
                  secure:true,
                  debug:true,   
                  secureConnection:false,
                  auth: {
                    user: 'psnacetbonafide@gmail.com',
                    pass: `${process.env.gmail_pass}`
                  },
                  tls:{
                    rejectUnauthorized:true
                  }
                });
                
                var mailOptions = {
                  from: 'psnacetbonafide@gmail.com',
                  to:email?email:"psnacetbonafide@gmail.com",
                  subject: 'OTP to update the password',
                  html: `<h1>${code}</h1>`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("sent successfully")
                    console.log('Email sent: ' + info.response);
                  }
                })
                res.status(200).json({email:mailOptions.to,code:encrpt_data})
            }
            catch(err){
              res.status(200).json({message:"mail not sent"})
              console.log(err)
            }
        }
        else{
          return res.status(200).json({message:"invalid mail"})
        }
    }
    else{
        return res.status(200).json({message:"You Don't Have An Account"})
    }
 
  
      }
)

module.exports=router