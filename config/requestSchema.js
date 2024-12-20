const mongoose=require('mongoose')

const requestSchema=mongoose.Schema(
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
        Subject:{
            type:String,
            required:true
        },
        Gender:{
            type:String,
            required:true
        },
        Contents:{
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
            type:String,
            required:true
        }

    },
    {
        timeStamp:true
    }
)

const request=mongoose.model("hods",requestSchema)
module.exports=request