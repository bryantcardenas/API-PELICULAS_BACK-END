import Peliculas from "../models/peliculas.js"
import * as fs from 'fs'
import path from 'path'
import url from 'url'
import subirArchivo from "../helpers/subir-archivo.js"



const peliculasPost= async (req,res)=>{
    const {titulo,subtitulo,genero,fechaCreacion,duracion,descripcion,imagen,actores}=req.body
    const peliculas= new Peliculas({titulo,subtitulo,genero,fechaCreacion,duracion,descripcion,imagen,actores})
    await peliculas.save()

    res.json({
        msg:"registro de pelicula exitoso"
    })
}
//buscar en todos las peliculas
const peliculasGet = async(req,res)=>{
    const peliculas = await Peliculas.find({})
    res.json({
        peliculas

    })
}
const peliculasGetBuscarid=async(req,res)=>{
    const {id}=req.params
    const peliculas=await Peliculas.findById(id)
    res.json({
        peliculas
    })
}
//buscar pelicula por titulo

const peliculasGetBuscar = async(req,res)=>{
    const {titulo}=req.params;
    const peliculas = await Peliculas.find({        
        $or:[
            {titulo: new RegExp(titulo,"i")},
            {subtitulo: new RegExp(titulo,"i")},
        ]
    })
    res.json({
        peliculas

    })
} 
const peliculasGetBuscarActor = async (req, res)=>{
    const {id}=req.params;
    const peliculas = await Peliculas.find().where('actores.idActor').in(id).exec();
    res.json({
        peliculas
    })
}
const peliculasDelete = async(req,res)=>{
    const {titulo}=req.query
    const peliculas = await Peliculas.findOneAndDelete({titulo})
   
    res.json({"eliminado":peliculas   })
  

 
}

const peliculasPutfoto= async(req,res)=>{
    const {id}=req.params
    const {imagen}=req.body
    const peliculasFoto =await Peliculas.findByIdAndUpdate(id,{imagen})
    res.json({
        "msg": "actualizacion exitosa"
    })
}


///////////////////////////////////////////////////////////////////////////////////7
//   CARGAR ARCHIVO A CLOUDYNARY

const cargarArchivoCloud= async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });
  
    const { id } = req.params;
    try {
        //subir archivo
        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            { width: 250, crop: "limit" },
            async function (error, result) {
                if (result) {
                    let peliculas = await peliculas.findById(id);
                    if (peliculas.imagen) {
                        const nombreTemp = peliculas.imagen.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    pelicula = await peliculas.findByIdAndUpdate(id, { imagen: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
  
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
  }
////////////////////////////////////////////////////////////////////////////////////
const cargarArchivo= async (req, res) => {
    const { id } = req.params;
    try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //persona a la cual pertenece la foto
        let peliculas = await Peliculas.findById(id);
        //si la persona ya tiene foto la borramos
        if (peliculas.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', peliculas.imagen);//ponemos el nombre de la carpeta en la cual almacenamos la imagen
            
            if (fs.existsSync(pathImage)) {               
                fs.unlinkSync(pathImage)
            }
            
        }
       
        peliculas = await Peliculas.findByIdAndUpdate(id, { imagen: nombre })
        //responder
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }

}
//mostrar imagen en postman
const mostrarImagen= async (req, res) => {
    const { id } = req.params

    try {
        let peliculas = await Peliculas.findById(id)
        if (peliculas.imagen) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', peliculas.imagen);
            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(400).json({ error })
    }
}



export {peliculasPost,peliculasGet,
    peliculasGetBuscar,peliculasGetBuscarActor
    ,peliculasDelete,peliculasGetBuscarid,
    peliculasPutfoto,cargarArchivo,mostrarImagen,
    cargarArchivoCloud
}