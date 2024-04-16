import { OBTENER_DETALLES_JUEGO, BUSCAR_JUEGO, FILTRAR_POR_GENERO } from "./action-types.js"
import axios from "axios"

export const obtenerDetallesJuego = (idVideogame) => {
  //  console.log("idVideogame", idVideogame); 

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${idVideogame}`);
         //   console.log("response", response); 
            dispatch({
                type: OBTENER_DETALLES_JUEGO,
                payload: response.data
            });
        } catch (error) {
            console.error("Error al obtener los detalles del juego:", error);
        }
    };
};


export const onSearch  = (nombre) => {
    return async (dispatch) => {
        try {
            const URL = 'http://localhost:3001/videogames/name';
            const response = await axios.get(URL, {
                params: {
                    nombre: nombre
                }
            });
//console.log(response)
            dispatch({
                type: BUSCAR_JUEGO,
                payload: response.data
            });
//console.log(response.data)

        } catch (error) {
            console.error("Error al buscar conductor:", error);
        }
    };
};


export const filtrarPorGenero = (nombreGenero) => {
    return {
        type: FILTRAR_POR_GENERO,
        payload: nombreGenero
    };
};