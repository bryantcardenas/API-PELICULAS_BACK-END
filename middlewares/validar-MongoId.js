import mongoose from "mongoose";
import actores from "../models/actores.js";

const validarMongoId = async(actores)=>{
    if (actores.lenght>0){
        for(let i=0; i<actores.lenght; i++){
            const reparto = actores[i];
            const valido = mongoose.Types.ObjectId.isValid(reparto.idActor);
            if ( ! valido ){
                throw new Error("el id del actor no es valido");
            }
        }
    }
};
const validarId = async(id)=>{
    const valido = mongoose.Types.ObjectId.isValid(id);
    if ( ! valido){
    throw new Error("el id del actor no es valido");
    }

}
export{validarMongoId,validarId}
