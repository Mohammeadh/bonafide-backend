const mongoose=require('mongoose')

const TutorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    Regno:{
        type:Number,
        required:true
    },
    Year:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Contents:{
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
    father:{
        type:String,
        required:true
    },
    tutor:{
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
    },
    date:{
        type:String,
        required:true
    }
})
const tutor=mongoose.model("Tutor",TutorSchema)
module.exports=tutor