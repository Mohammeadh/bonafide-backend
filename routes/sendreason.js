var nodemailer = require('nodemailer');

const sendreason=async(req,res)=>{


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
            to: req.body.data.email?req.body.data.email:"mohammedbahardeens21it@psnacet.edu.in",
            subject: 'Bonafide Request',
            html: `<div>
            <h3>Reason : ${req.body.data.reason}</h3>
            </div>`
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

module.exports=sendreason