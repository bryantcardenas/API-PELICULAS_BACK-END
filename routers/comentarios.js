import {Router}from "express";
import { check } from "express-validator";
import {comentarioPost,comentarioGet, comentariogetBuscar,comentarioGetId} from "../controllers/comentarios.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";



const router=Router()

//buscar en todos los comentarios 
router.get("/",[
    validarJWT,
    // check('id').isMongoId(),
    validarCampos
],comentarioGet);

// buscar comentarios por id
router.get("/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],comentarioGetId)

// buscar comentarios por usuario
router.get("/buscar",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],comentariogetBuscar)


// agregar comentario
router.post("/",[
    validarJWT,
    check('usuario',"el usuario es obligatorio").not().isEmpty(),
    check('pelicula',"la pelicula es obligatoria").not().isEmpty(),
    check('comentarios',"el comentario es obligatorio").not().isEmpty(),
    // validarExistaArchivo,
    validarCampos,
],comentarioPost)
export default router;