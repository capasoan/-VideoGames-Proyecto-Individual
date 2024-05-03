import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";

import Paginado from '../Paginado/Paginado';

const FiltrarGenero = () => {

  const juegosFiltrados = useSelector(state => state.juegosFiltradosPorGenero);

 //console.log(juegosFiltrados);

  if (juegosFiltrados.length === 0) {
    return (
      <div className='fondoJuegos-filtrados'>
        <div className='juegosFiltrados'>
          <h1>No hay juegos filtrados por género</h1>
        </div>
        <div> 
          <NavLink to="/homepage">
            <button className="button">Volver</button>
          </NavLink>
        </div>
      </div>
    );
  }

return (
    <div className='fondoJuegos-filtrados'>
      <div className='jusgosFiltrados'>
      <h1>Juegos Filtrados Por Genero</h1>
      <div className="tarjetas">

<div className='paginado'>
<Paginado videoGames={juegosFiltrados} pageSize={15} />
</div>

</div>
</div>
    </div>
  );
}

export default FiltrarGenero;
