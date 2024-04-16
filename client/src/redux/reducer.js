import { BUSCAR_JUEGO, OBTENER_DETALLES_JUEGO, FILTRAR_POR_GENERO } from "./action-types.js";

const initialState = {
  videoGames: [],
  detalleDelJuego: null,
  juegosFiltradosPorGenero: []
};

const rootReducer = (state = initialState, action) => {

  //console.log('Acción:', action.type); 
  //console.log('Payload:', action.payload); 
  //console.log('Estado antes de la acción:', state);

  switch (action.type) {
    case BUSCAR_JUEGO:
      return {
        ...state,
        videoGames: [...state.videoGames, action.payload]
      };

    case OBTENER_DETALLES_JUEGO:
      return {
        ...state,
        detalleDelJuego: action.payload
      };


    case FILTRAR_POR_GENERO:
      const nombreGenero = action.payload.toLowerCase();
      const juegosFiltrados = state.videoGames.filter(juego =>
        juego.genres && Array.isArray(juego.genres) && juego.genres.some(genero =>
          genero.toLowerCase() === nombreGenero
        )
      );
      return {
        ...state,
        juegosFiltradosPorGenero: juegosFiltrados
      };


    default:
      return state;
  }
};

export default rootReducer;
