const mongoose=require('mongoose')

const savedrequestSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        reason:{
            type:String,
            required:true
        },
        department:{
            type:String,
            required:true
        },
        year:{
            type:String,
            required:true
        },
        regNo:{
            type:String,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        Father:{
            type:String,
            required:true
        },
        tutors:{
            type:String,
            required:true
        },
        cgpa:{
            type:String,
            required:true
        },
        sem:{
            type:String,
            required:true 
        },
        mode:{
            type:String
        }

    },
    {
        timeStamp:true
    }
)

const savedrequest=mongoose.model("Tech",savedrequestSchema)
module.exports=savedrequest