import mongoose from "mongoose";

const PeliculasSchema = new mongoose.Schema({
    titulo:{type:String,maxlength:100,required:true},
    subtitulo:{type:String,maxlength:100,required:true},
    genero:{type:String,maxlength:100,required:true},
    fechaCreacion:{type:Date,default:Date()},
    duracion:{type:String,required:true},
    descripcion:{type:String,maxlength:2000,required:true},
    imagen:{type:String,maxlength:100},
    estado:{type:String,required:true,default:1},
    actores:[
        {idActor:{type:mongoose.Schema.ObjectId,ref:"Actores"}},
        {personajes:{type:String,maxlength:100}}, 
        
  
    ]
})  

export default mongoose.model("peliculas",PeliculasSchema)