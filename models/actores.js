import mongoose from "mongoose";

const ActoresSchema = new mongoose.Schema({
    nombre:{type:String,maxlength:100,required:true},
    personajes:{type:String,maxlength:100,required:true},
    foto:{type:String},
    fechaCreacion:{type:Date,default:Date.now()}        
})

export default mongoose.model("actores",ActoresSchema)