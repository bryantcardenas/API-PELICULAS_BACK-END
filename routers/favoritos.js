import {Router} from "express"

import { favoritosDelete, favoritosget, favoritosPost,favoritosGetBuscarid, favoritosGetBuscar } from "../controllers/favoritos.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validarExistaArchivo from "../middlewares/validar-existencia-archivo.js";

const router = Router();

// eliminar de favoritos
router.delete("/",[
    validarJWT,
    check('id').isMongoId(),
    
    validarCampos
],favoritosDelete);


// listar favoritos por id
router.get("/listarid/:id",[
    validarJWT,
    check('id').isMongoId(),
  
    validarCampos
],favoritosGetBuscarid)

router.get("/buscarTitulo",[
    validarJWT,
    check('id').isMongoId(),
  
    validarCampos
],favoritosGetBuscar)

// agregar a favoritos
router.post("/",[
    validarJWT,
    check('usuario',"el usuario es obligatorio").not().isEmpty(),
    check('pelicula',"la pelicula debe ser obligatoria").not().isEmpty(),
 
    validarCampos,
],favoritosPost)

export default router;