const request=require('../config/requestSchema')

const hodController=async(req,res)=>{
    try{
        const response=await request.find().sort({ _id: -1 });
        return res.status(200).json({data:response})
    }
    catch(err){
        console.log(err)
        res.status(200).json({message:`${err}`})
    }
   

}

module.exports=hodController;