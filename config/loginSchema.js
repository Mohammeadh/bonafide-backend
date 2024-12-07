const mongoose=require('mongoose')

const loginSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        }

    },
    {
        timeStamp:true
    }
)

const user=mongoose.model("users",loginSchema)
module.exports=user