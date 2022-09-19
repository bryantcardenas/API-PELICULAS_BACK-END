import Favoritos from "../models/Favoritos.js";

const helpersFavoritos = {
  existeUsuarioById: async (id) => {
    const existe = await Favoritos.findById(id);

    if (!existe) {
      throw new Error(`El id de usuario no existe ${id}`);
    }
  },

  existePeliculaById: async (id) => {
    const exist = await Favoritos.findById(id);
    if (!exist) {
      throw new Error(`El id de peliculas no existe ${id}`);
    }
  },
};
export default helpersFavoritos;
