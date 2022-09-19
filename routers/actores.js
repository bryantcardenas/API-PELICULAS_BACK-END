import {Router} from "express"
import { actoresGetBuscar, actoresPost , actoresPutEditar, actoresDelete, actoresGetBuscarid, actoresPutfoto,} from "../controllers/actores.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarMongoId } from "../middlewares/validar-MongoId.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validarExistaArchivo from "../middlewares/validar-existencia-archivo.js";
//import validarExistaArchivo from "../middlewares/validar-existencia-archivo.js";

const router = Router();

// listar todos los actores
router.get("/listartodo",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],actoresGetBuscar);

// listar actores por id
router.get("/listarid/:id",[
    validarJWT,
    check('id').custom(validarMongoId),
    validarCampos
],actoresGetBuscarid);

// editar actor por id
router.put("/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],actoresPutEditar);

// eliminar actor
router.delete("/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],actoresDelete);

// agregar actor a la api
router.post("/",[
    validarJWT,
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 100 caracteres").isLength({max:100}),
    check('personajes',"El personaje es obligatoro").not().isEmpty(),
    check('personajes',"Debe tener menos de 100 caracteres").isLength({max:100}),
    validarCampos,
],actoresPost);


// agregar foto a los actores
router.put("/foto/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],
actoresPutfoto);

export default router;