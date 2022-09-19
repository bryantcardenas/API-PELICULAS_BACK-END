import Actores from "../models/actores.js"
//insertar actor
const actoresPost= async (req,res)=>{
    const {nombre,personajes,foto}=req.body
    const actores = new Actores ({nombre,personajes,foto})
    
    await actores.save()

    res.json({
       actores
    })

}
// editar foto
const actoresPutfoto= async(req,res)=>{
    const {id}=req.params
    const {foto}=req.body
    const actorFoto =await Actores.findByIdAndUpdate(id,{foto})
    res.json({
        "msg": "actualizacion exitosa"
    })
}
// buscar actor por id
const actoresGetBuscarid=async(req,res)=>{
    const {id}=req.params
    const actor=await Actores.findById(id)
    res.json({
        actor
    })
}
// buscar actor por nombre
// const actoresGetBuscarNombre = async(req,res)=>{
//     const {nombre}=req.query
//     const actores = await Actores.find({nombre})
//     res.json({
//         actores

//     })
// }
// buscar todos los actores
const actoresGetBuscar = async(req,res)=>{
    const actores = await Actores.find({})
    res.json({
        actores
    })
}

// editar actor por id
const actoresPutEditar = async(req,res)=>{
    const {id}=req.params
    const {nombre,personajes}=req.body
    const actores = await Actores.findByIdAndUpdate(id,{nombre,personajes})
    res.json({
       msg: "actualizacion de datos exitosa"

    })
}
//eliminar actor por nombre
const actoresDelete = async(req,res)=>{
    const {id}=req.params
    const actores = await Actores.findByIdAndDelete(id)
   
    res.json({"eliminado":actores   })
  

 
}

export {actoresPost,actoresPutEditar,actoresGetBuscar,actoresDelete,actoresPutfoto,actoresGetBuscarid}

