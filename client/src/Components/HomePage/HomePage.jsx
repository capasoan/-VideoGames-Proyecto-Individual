import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import SearchBar from "../SearchBar/SearchBar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onSearch, filtrarPorGenero, ordenarNombreDescendente,ordenarNombreAscendente, odenarRatingDescendente, odenarRatingAscendente } from "../../redux/actions";
import { NavLink } from "react-router-dom";

const HomePage = () => {
    const [generosDisponibles, setGenerosDisponibles] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');
    const [ordenamiento, setOrdenamiento] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const obtenerGeneros = async () => {
            try {
                const response = await axios.get('http://localhost:3001/genres');
                setGenerosDisponibles(response.data);
                //   console.log(response.data);
            } catch (error) {
                console.error('Error al obtener generos disponibles:', error);
            }
        };

        obtenerGeneros();
    }, []);

    const handleSeleccionarGenero = (nombreGenero) => {
        setGeneroSeleccionado(nombreGenero);
        dispatch(filtrarPorGenero(nombreGenero));
    };

    const handleSearch = async (nombre) => {
        dispatch(onSearch(nombre));
    };
    //console.log(generoSeleccionado)

 const handleOrdenar = (tipoOrden) => {
    setOrdenamiento(tipoOrden);
    if (tipoOrden === 'letraAs') {
        dispatch(ordenarNombreAscendente(tipoOrden));
    } else if (tipoOrden === 'letraDes') {
        dispatch(ordenarNombreDescendente(tipoOrden));
    } else if (tipoOrden === 'numeroAs') {
        dispatch(odenarRatingAscendente(tipoOrden));
    }else if (tipoOrden === 'numeroDes') {
        dispatch(odenarRatingDescendente(tipoOrden));
    } 
};



    const videoGames = useSelector(state => state.videoGames);
   // console.log(videoGames)


    return (
          <div>
            <h1>Home Page</h1>
            <h2>La mejor página de la historia la encontrarás en Home Page</h2>
            <SearchBar onSearch={handleSearch} />
            
            <select value={generoSeleccionado} onChange={(e) => handleSeleccionarGenero(e.target.value)}>
                <option value="generosDisponibles">Selecciona un género</option>
                {generosDisponibles.map((genero, id) => (
                    <option key={id} value={genero.Nombre}>{genero.Nombre}</option>
                ))}
            </select>

            {generoSeleccionado && (
                   <Link to={`/FiltrarGenero/${generoSeleccionado || ''}`}>
                   <button>Filtrar por género</button>
               </Link>
            )}

            <div>
                <select value={ordenamiento} onChange={(e) => handleOrdenar(e.target.value)}>
                    <option value="">Ordenar</option>
                    <option value="letraAs">Nombre ascendente</option>
                    <option value="letraDes">Nombre descendente</option>
                    <option value="numeroAs">Rating ascendente</option>
                    <option value="numeroDes">Rating descendente</option>
                </select>

                
                <NavLink to="/Form">
                    <button>Crear Video juego</button>
                </NavLink>
            </div>

            <Cards videoGames={videoGames} />

       
            
        </div>
    );
}

export default HomePage;



