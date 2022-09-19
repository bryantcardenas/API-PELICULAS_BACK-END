import Favoritos from "../models/favoritos.js";

//agregar favoritos
const favoritosPost= async (req,res)=>{
    const {usuario,pelicula}=req.body
    const favoritos = new Favoritos ({usuario,pelicula})
    
    await favoritos.save()

    res.json({
       favoritos
    })
}

//buscar todos los favoritos
const favoritosget = async(req,res)=>{
    const favoritos=await Favoritos.find()
    .populate("usuario","nombre")
    .populate("pelicula",["titulo","imagen"])
    
   
    res.json({favoritos   })
  

 
}
//buscar favoritos por id
const favoritosGetBuscarid=async(req,res)=>{
    const {id}=req.params
    const favoritos=await Favoritos.findById(id)
    res.json({
        favoritos
    })
}

//eliminar favoritos
const favoritosDelete = async(req,res)=>{
    const {pelicula}=req.query
    const favoritos = await Persona.findOneAndDelete({pelicula})
   
    res.json({" pelicula eliminada de favoritos":favoritos   })
  

 
}
const favoritosGetBuscar = async(req,res)=>{
    const {usuario}=req.query
    const favoritos = await Favoritos.find({        
        $or:[
            {usuario: new RegExp(usuario,"i")},
            {pelicula: new RegExp(usuario,"i")},
        ]
    })
    res.json({
        favoritos

    })
} 

export {favoritosPost,favoritosDelete,favoritosget,favoritosGetBuscarid,favoritosGetBuscar}