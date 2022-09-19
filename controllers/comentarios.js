import Comentario from "../models/comentarios.js"


// agregar un comentario
const comentarioPost=async(req,res)=>{
    const {usuario,pelicula,comentarios}=req.body
    const comentario=new Comentario({usuario,pelicula,comentarios}) 
    await comentario.save()
    res.json({
        "msg":"Comentario realizado con éxito!"
    })
}  
//buscar en todos los comentarios 
const comentarioGet=async(req,res)=>{
    const comentarios=await Comentario.find({})
    // .populate("usuario","pelicula")
    // .populate("pelicula","titulo")
    res.json({
        comentarios
    })
}
const comentarioGetId=async(req,res)=>{
    const {id}=req.params
    const comentarios=await Comentario.findById(id)
    // .populate("usuario","nombre")
    // .populate("pelicula","titulo")
    res.json({
        comentarios
    })
}

//buscar comentario por nombre
const comentariogetBuscar=async(req,res)=>{
    const {usuario}=req.query
    const comentarios = await Comentario.find({usuario})
    res.json({
        comentarios
    })
}
export {comentarioPost,comentarioGet,comentariogetBuscar,comentarioGetId}