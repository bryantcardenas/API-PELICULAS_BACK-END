import mongoose from "mongoose";

const FavoritosShechema=new mongoose.Schema({
    usuario: {type:mongoose.Schema.ObjectId,ref:"Persona",required:true},
    pelicula:{type:mongoose.Schema.ObjectId,ref:"Pelicula",required:true},
})



export default mongoose.model("Favoritos",FavoritosShechema)