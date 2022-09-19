import mongoose from "mongoose";

const ComentarioSchema= new mongoose.Schema({
    usuario:{type:mongoose.Schema.ObjectId,ref:"Usuario",required:true},
    pelicula:{type:mongoose.Schema.ObjectId,ref:"Pelicula",required:true},
    comentarios:{type:String,required:true}
})

export default mongoose.model("Comentario",ComentarioSchema)