import express from 'express'
import cors from "cors"
import bdconectar from '../database/config.js';
import Peliculas from "../routers/peliculas.js";
import favoritos from '../routers/favoritos.js';
import Actores from '../routers/actores.js';
import Personas from '../routers/personas.js';
import comentarios from '../routers/comentarios.js';
import fileUpload from 'express-fileupload';



class Server{
    constructor(){
        this.app=express();
        this.middlewares();
        this.port=process.env.PORT
        this.conectarbd()
        this.routes()
   }
   middlewares(){
       this.app.use(express.json());
       this.app.use(cors());
       this.app.use(express.static("public"))
       this.app.use(fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp/',
        createParentPath:true
    }))
   }
   async conectarbd(){
       await bdconectar()
   }
   routes(){
       this.app.use("/api/peliculas", Peliculas     )
       this.app.use("/api/personas", Personas)
       this.app.use("/api/favoritos",favoritos   )
       this.app.use("/api/actores",Actores   )
       this.app.use("/api/comentarios",comentarios)
   }


   escuchar(){
       this.app.listen(this.port,() => {
           console.log(`Servidor escuchando en el puerto ${this.port}`);
       })
   }

}
export default Server;