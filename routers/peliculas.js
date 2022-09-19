import {Router} from "express"
import {  cargarArchivo, mostrarImagen, peliculasDelete, peliculasGet, peliculasGetBuscar,  peliculasGetBuscarActor,  peliculasGetBuscarid,  peliculasPost, peliculasPutfoto } from "../controllers/peliculas.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarMongoId } from "../middlewares/validar-MongoId.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import HelpersPeliculas from "../helpers/peliculas.js";
import validarExistaArchivo from "../middlewares/validar-existencia-archivo.js";





const router = Router();
// agregar foto a la pelicula
router.put("/agregarfoto/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarExistaArchivo,
    validarCampos
],peliculasPutfoto)

// subir imagen de la pelicula
router.get("/upload/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    validarCampos   
],mostrarImagen) //controlador


router.post('/upload/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    validarExistaArchivo,
    validarCampos
],  cargarArchivo )


//buscar pelicula po id
router.get("/buscarid/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    // validarExistaArchivo,
    validarCampos
],peliculasGetBuscarid)

//buscar todas las peliculas
router.get("/",[
    validarJWT,
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(HelpersPeliculas.existePeliculaById), 
   
    validarCampos
],peliculasGet);

 //buscar pelicula por titulo
router.get("/buscar/:titulo",[
    validarJWT,
    // check('id', 'No es un titulo válido').isMongoId(),
    // check('id').custom(HelpersPeliculas.existePeliculaById), 
    
    validarCampos
],peliculasGetBuscar);

// buscar actor por id
router.get("/buscarActor/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(HelpersPeliculas.existePeliculaById), 
    
    validarCampos
],peliculasGetBuscarActor);

router.delete("/",peliculasDelete)

// agregar peliculas
router.post("/",[
    validarJWT,
    check('titulo',"El titulo es obligatoro").not().isEmpty(),
    check('titulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('subtitulo',"El subtitulo es obligatoro").not().isEmpty(),
    check('subtitulo',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('genero',"El genero es obligatoro").not().isEmpty(),
    check('genero',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('descripcion',"Debe tener menos de 2000 caracteres").isLength({max:2000}),
    check('descripcion',"La descripcion es Obligatoria").not().isEmpty(),
    check('duracion',"Es Obligatorio").not().isEmpty(),
    check('imagen',"Debe tener menos de 1000 caracteres").isLength({max:1000}),
    //check('actores').custom(validarMongoId),
  
    validarCampos
],peliculasPost);


export default router;