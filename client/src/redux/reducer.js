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
        const nombregenero = action.payload.toLowerCase();
        const juegosFiltrados = state.videoGames.filter(juego =>
          juego.generos && Array.isArray(juego.generos) && juego.generos.some(genero => genero.Nombre.toLowerCase() === nombregenero)
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
