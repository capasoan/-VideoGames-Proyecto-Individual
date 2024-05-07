import { OBTENER_DETALLES_JUEGO, BUSCAR_JUEGO, FILTRAR_POR_GENERO, ORDENAR_POR_NOMBRE_DES, ORDENAR_POR_NOMBRE_AS, ORDENAR_POR_RATING_DES, ORDENAR_POR_RATING_AS, ACTUALIZAR_DATOS_FORMULARIO, ACTUALIZAR_DATOS_VALIDACIONES } from "./action-types.js"
import axios from "axios"

export const onSearch = (nombre) => {
    return async (dispatch) => {
        try {
            const URL = 'http://localhost:3001/videogames/name';
            const response = await axios.get(URL, {
                params: {
                    nombre: nombre
                }
            });

            let juegos = [];
            if (Array.isArray(response.data.juegos)) {

                juegos = response.data.juegos.map(juego => {
                    const juegoData = juego[0];
                   // console.log("Juego:", juegoData);
                    return {
                        id: juegoData.id || juego.idVideogame,
                        name: juegoData.Nombre || juego.name,
                        released: juegoData.Fechadelanzamiento || juego.released,
                        rating: juegoData.Rating || juego.rating,
                        img: juegoData.Imagen || juego.img,
                        platforms: juegoData.Plataformas || juego.platforms,
                        requirements: juegoData.Descripcion || juego.requirements,
                        genres: juego.generos ? juego.generos.map(genero => genero.Nombre) : [],
                        source: 'database'
                    };
                });
                
                
                
            } else {

                juegos = response.data.map(juego => ({
                    id: juego.id,
                    name: juego.name,
                    released: juego.released,
                    rating: juego.rating,
                    img: juego.img,
                    platforms: juego.platforms,
                    requirements: juego.requirements,
                    genres: juego.genres,
                    source: 'api'
                }));
            }
//console.log('resultados',juegos)
            dispatch({
                type: BUSCAR_JUEGO,
                payload: juegos
            });
        } catch (error) {
            console.error("Error al buscar juego:", error);
        }
    };
};


export const obtenerDetallesJuego = (idVideogame) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${idVideogame}`);
            
            let juegoFormateado;
            
    // console.log(response.data.game)
 
if (response.data.game) {

    juegoFormateado = {
        id: response.data.game.id,
        name: response.data.game.Nombre,
        released: response.data.game.Fechadelanzamiento,
        rating: response.data.game.Rating,
        img: response.data.game.Imagen,
        platforms: response.data.game.Plataformas,
        requirements: Array.isArray(response.data.game.Descripcion) ? response.data.game.Descripcion : [response.data.game.Descripcion],
        genres: response.data.genre.map(g => g.Nombre),
        source: 'database'
    };
} else {

    juegoFormateado = {
        id: response.data.id,
        name: response.data.name,
        released: response.data.released,
        rating: response.data.rating,
        img: response.data.img,
        platforms: response.data.platforms,
        requirements: response.data.requirements,
        genres: response.data.genres,
        source: 'api'
    };
}

// console.log(response.data)
            dispatch({
                type: OBTENER_DETALLES_JUEGO,
                payload: juegoFormateado
            });
        } catch (error) {
            console.error("Error al obtener los detalles del juego:", error);
        }
    };
};


export const filtrarPorGenero = (nombreGenero) => {
    // console.log("nombreGenero", nombreGenero)
    return {
        type: FILTRAR_POR_GENERO,
        payload: nombreGenero
    };
};


export const ordenarNombreAscendente = (letraAs) => {
    console.log("letraAs", letraAs)

    return {
        type: ORDENAR_POR_NOMBRE_AS,
        payload: letraAs
    };
};

export const ordenarNombreDescendente = (letraDes) => {
    console.log("letraDes", letraDes)
    return {
        type: ORDENAR_POR_NOMBRE_DES,
        payload: letraDes
    };
};


export const odenarRatingAscendente = (numeroAs) => {
    console.log("numeroAs", numeroAs)
    return {
        type: ORDENAR_POR_RATING_AS,
        payload: numeroAs
    };
};

export const odenarRatingDescendente = (numeroDes) => {
console.log("numeroDes", numeroDes)
    return {
        type: ORDENAR_POR_RATING_DES,
        payload: numeroDes
    };
};

export const descargarDatosFormulario = (formData) => ({
    type: ACTUALIZAR_DATOS_FORMULARIO,
    payload: formData,
});

export const descargarDatosValidaciones = (validations) => ({
    type: ACTUALIZAR_DATOS_VALIDACIONES,
    payload: validations,
});