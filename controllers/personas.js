import Personas from "../models/personas.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";
//agregar persona
const personaPost = async (req, res) => {
  const {nombre,email, password,foto  } = req.body;
  let salt = bcryptjs.genSaltSync(10);
  const persona = new Personas({ nombre, email, password,foto });
  persona.password = bcryptjs.hashSync(password, salt);
  await persona.save();

  res.json({
    msg: "registro exitoso",
  });
};
// loguearse
// const personaGetlogin = async (req, res) => {
//   let { email, password } = req.body;

//   const persona = await Personas.findOne({ email });

//   if (!persona) res.json({ msg: "Usuario no encontrado" });
//   else {
//     const validPassword = bcryptjs.compareSync(password, persona.password);

//     if (validPassword) {
//       const token = await generarJWT(persona.id);
//       res.json({
//         persona,
//         token,
//       });
//     } else {
//       res.json({ msg: "Usuario no encontrado" });
//     }
//   }
// };

const personaGetlogin= async (req, res) => {
  const { email, password } = req.body;

  try {
      const persona = await Personas.findOne({ email })
      if (!persona) {
          return res.status(400).json({
              msg: "Usuario / Password no son correctos"
          })
      }


      if (persona.estado === 0) {
          return res.status(400).json({
              msg: "Usuario Inactivo"
          })
      }

      const validPassword = bcryptjs.compareSync(password,persona.password);
      if (!validPassword) {
          return res.status(400).json({
              msg: "Usuario / Password no son correctos"
          })
      }

      
      const token = await generarJWT(persona.id);

      res.json({
          persona,
          token
      })

  } catch (error) {
      return res.status(500).json({
          msg: "Hable con el WebMaster"
      })
  }
}



const personasfotopost = async (req, res) => {
  const { id } = req.params;
  const { foto } = req.body;
  const personaFoto = await Personas.findByIdAndUpdate(id, { foto });
  res.json({
    msg: "actualizacion exitosa",
  });
};

const cargarArchivoPersonas= async (req, res) => {
  const { id } = req.params;
  try {
      let nombre
      await subirArchivo(req.files, undefined)
          .then(value => nombre = value)
          .catch((err) => console.log(err));

      //persona a la cual pertenece la foto
      let personas = await Personas.findById(id);
      //si la persona ya tiene foto la borramos
      if (personas.foto) {
          const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
          const pathImage = path.join(__dirname, '../uploads/', personas.foto);//ponemos el nombre de la carpeta en la cual almacenamos la imagen
          
          if (fs.existsSync(pathImage)) {               
              fs.unlinkSync(pathImage)
          }
          
      }
     
      personas = await Personas.findByIdAndUpdate(id, { foto: nombre })
      //responder
      res.json({ nombre });
  } catch (error) {
      res.status(400).json({ error, 'general': 'Controlador' })
  }

}

// cargar archivo cloudDynary

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
                  let personas = await Personas.findById(id);
                  if (personas.imagen) {
                      const nombreTemp = personas.imagen.split('/')
                      const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                      const [public_id] = nombreArchivo.split('.')
                      cloudinary.uploader.destroy(public_id)
                  }
                  pelicula = await Personas.findByIdAndUpdate(id, { imagen: result.url })
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


const personasGetBuscarid = async (req, res) => {
  const { id } = req.params;
  const persona = await Personas.findById(id);
  res.json({
    persona,
  });
};
const personaGetBuscar = async (req, res) => {
  const persona = await Personas.find({});
  res.json({
    persona,
  });
};
const personasGetBuscarNoE = async (req, res) => {
  const { value } = req.query;
  const persona = await Personas.find({
    $or: [
      { nombre: new RegExp(value, "i") },
      { email: new RegExp(value, "i") },
    ],
  });
  res.json({
    persona,
  });
};
// const personasPutEditar = async (req, res) => {
//   const { id } = req.params;
//   const { nombre, email, password, estado, foto } = req.body;
//   let salt = bcryptjs.genSaltSync(10);
//   //const persona = new Personas({ nombre, email, password,foto});
//   personas.password = bcryptjs.hashSync(password, salt);
//   const personas = Personas.findByIdAndUpdate(id, {
//     nombre,
//     email,
//     password,
//     estado,
//     foto,
//   });
//   await Personas.save()  
//   res.json({
//     msg: "actualizacion de datos exitosa",
//   });
// };


const personasPutEditar = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password} = req.body;
  let salt = bcryptjs.genSaltSync(10);
  const personas =await Personas.findByIdAndUpdate(id, {
    nombre,
    email,
    password,
  });
  personas.password = bcryptjs.hashSync(password, salt);
  await personas.save()  
  res.json({
    msg: "actualizacion de datos exitosa",
  });
};

const personasPutActivar = async(req,res)=>{
    const {id}=req.params
    const persona = await Personas.findByIdAndUpdate(id,{estado:1})
    res.json({
       msg: "activacion de estado exitosa"

    })
}
const personasPutInactivar = async(req,res)=>{
    const {id}=req.params
    const persona = await Personas.findByIdAndUpdate(id,{estado:0})
    res.json({
       msg: "activacion de estado exitosa"

    })
}

export {
  personaGetlogin,
  personaPost,
  cargarArchivoPersonas,
  personasGetBuscarid,
  personaGetBuscar,
  personasGetBuscarNoE,
  personasPutEditar,personasPutActivar,
  personasPutInactivar,personasfotopost,
  cargarArchivoCloud
};
