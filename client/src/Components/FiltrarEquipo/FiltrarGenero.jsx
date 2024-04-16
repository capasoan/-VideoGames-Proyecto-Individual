import React from 'react';
import { useSelector } from 'react-redux';
import Cards from "../Cards/Cards";

const FiltrarGenero = () => {
  const juegosFiltrados = useSelector(state => state.juegosFiltradosPorGenero);

  return (
    <div>
      <h1>Juegos Filtrados Por Genero</h1>
      <Cards videoGames={juegosFiltrados} />
    </div>
  );
}

export default FiltrarGenero;
