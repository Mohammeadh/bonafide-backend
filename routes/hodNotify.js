var nodemailer = require('nodemailer');
let loginSchema=require('../config/loginSchema')

const notifyController=async(req,res)=>{
  try{
    const detials_tutor=await loginSchema.findOne({role:"hod"})
    var detial_email=detials_tutor.email
   }
   catch(err){
    return res.status(200).json({error:"Tutor Not Found"})
   }

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
            to: detial_email?detial_email:"mohammedbahardeens21it@psnacet.edu.in",
            subject: 'Bonafide request',
            html: `
            <html>
          
            <head>
            </head>
            <body>
            <div>
            <h3>Name:${req.body.data.name}</h3>
            <h3>Email:${req.body.data.email}</h3>
            <h3>Reason:${req.body.data.reason}</h3>
            <h3>Year:${req.body.data.year}</h3>
            <h3>Registration no:${req.body.data.Regno}</h3>
            <h3>Tutor:${req.body.data.tmail}</h3>
            <a href="http://localhost:3001">click</a>
            </div>
            </body>
            </html>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log("sent successfully")
              console.log('Email sent: ' + info.response);
            }
          });
          res.status(200).json({message:"notifed successfully"})
    }
    catch(err){
       console.log(err)
       res.status(200).json({message:"notifed failed"})
    }
    
}

module.exports=notifyController