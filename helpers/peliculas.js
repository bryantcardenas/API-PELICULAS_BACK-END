import Peliculas from "../models/peliculas.js"

const HelpersPeliculas ={
    existePeliculaById:async (id)=>{
        const existe = await Peliculas.findById(id)

        if (! existe)
        throw new Error(`El id de la pelicula no existe ${id}`)
    }
}

export default HelpersPeliculas;