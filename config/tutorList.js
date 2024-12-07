const mongoose=require('mongoose')

const tList=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
             type:String,
             required:true
        },
        role:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

const tutorList=mongoose.model("tutorList",tList)
module.exports=tutorList