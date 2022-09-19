import {Router} from "express"
import { check } from "express-validator";
import helpersPersonas from "../helpers/personas.js"
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import validarExistaArchivo from "../middlewares/validar-existencia-archivo.js";
import { cargarArchivo } from "../controllers/peliculas.js";
import { personaPost ,personaGetlogin,personasGetBuscarid, personaGetBuscar, personasGetBuscarNoE, personasPutEditar, personasPutInactivar, personasPutActivar, cargarArchivoPersonas, personasfotopost, } from "../controllers/Personas.js";

const router = Router();

// subir foto
router.post('/subir/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPersonas.existePersonaById), 
    validarExistaArchivo,
    validarCampos,
],  cargarArchivo,cargarArchivoPersonas )

//buscar usuario por id
router.get("/buscarid/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarExistaArchivo,
    validarCampos
],personasGetBuscarid)


// inactivar usuario
router.put("/inactivar/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarExistaArchivo,
    validarCampos
],personasPutInactivar); 

//activar usuario
router.put("/activar/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarExistaArchivo,
    validarCampos
],personasPutActivar); 

//editar usuario
router.put("/editar/:id",[
    validarJWT,
    check('id').isMongoId(),
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 25 caracteres").isLength({max:25}),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener más de 6 caracteres").isLength({min:6}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(helpersPersonas.existeEmail),
    validarCampos
],personasPutEditar);

router.put("/foto/:id",[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersPersonas.existePersonaById),
    validarExistaArchivo,
    validarCampos
],personasfotopost)

// login de usuario
router.post("/login",[
    check('email',"el email es obligatorio").isEmail(),
    check('password',"la contraseña es obligatoria").not().isEmpty(),
    validarCampos
],personaGetlogin);

// buscar usuario
router.get("/b",[
    validarJWT,
    check('id').isMongoId(),
    validarExistaArchivo,
    validarCampos
],personaGetBuscar);

// buscar usuario por nombre y email
router.get("/NoE",[
    validarJWT,
    // check('id').isMongoId(),
    validarCampos
],personasGetBuscarNoE);

// insertar usuario
router.post("/insertarUsuario",[
   // validarJWT,
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('nombre',"Debe tener menos de 25 caracteres").isLength({max:25}),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener más de 8 caracteres").isLength({min:8}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(helpersPersonas.existeEmail), 
    validarCampos,
],personaPost);


export default router;