const mongoose=require('mongoose')

const historySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        year:{
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
        reg:{
            type:String,
            required:true
        },
        father:{
            type:String,
            required:true
        },
        cgpa:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        gender:{
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

    }
)
historySchema.index({ reg: 1, date: 1 }, { unique: true });
const history=mongoose.model("history",historySchema)

module.exports=history