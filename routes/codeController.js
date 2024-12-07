var nodemailer = require('nodemailer');
const storage = require('node-sessionstorage')
const CryptoJs=require('crypto-js')
const tutor=require('../config/tutorList')

const codeController=async(req,res)=>{
    
    const email=req.body.data.email
    const mail=email.split('@')[1]


    const verify=await tutor.findOne({email})

    if(verify)
    {
      return res.status(200).json({message:"Only for student"})
    }
    if(mail==="psnacet.edu.in"){
      const code=Math.floor(Math.floor(
        Math.random() * (97868 - 96) + 31
      ))
      const key="bonafideforpsna123"
      const encryptedValue=(value)=>{
        return CryptoJs.AES.encrypt(value.toString(),key).toString()
      }
      const encrpt_data=encryptedValue(code)
      
     
   
      // storage.setItem("otp",`${code}#${email}`)  
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
              to: email?email:"psnacetbonafide@gmail.com",
              subject: 'Verification Code',
              html: `<h1>${code}</h1>`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log("sent successfully")
                console.log('Email sent: ' + info.response);
              }
            });
            res.status(200).json({email,key:encrpt_data})
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
      
    


 
module.exports={codeController}
