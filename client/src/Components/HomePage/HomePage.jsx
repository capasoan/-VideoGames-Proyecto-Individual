import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../Cards/Cards';
import SearchBar from "../SearchBar/SearchBar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onSearch, filtrarPorGenero } from "../../redux/actions";

const HomePage = () => {
    const [generosDisponibles, setGenerosDisponibles] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const obtenerEquipos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/genres');
                setGenerosDisponibles(response.data);
             //   console.log(response.data);
            } catch (error) {
                console.error('Error al obtener equipos disponibles:', error);
            }
        };

        obtenerEquipos();
    }, []);

    const handleSeleccionarEquipo = (selectedTeam) => {
        setGeneroSeleccionado(selectedTeam);
        dispatch(filtrarPorGenero(selectedTeam)); 
    };

    const handleSearch = async (nombre) => {
        dispatch(onSearch(nombre));
    };
    const videoGames = useSelector(state => state.videoGames);
    return (
        <div>
            <h1>Home Page</h1>
            <h2>La mejor página de la historia la encontrarás en Home Page</h2>
            <SearchBar onSearch={handleSearch} />
            <select value={generoSeleccionado} onChange={(e) => handleSeleccionarEquipo(e.target.value)}>
                <option value="">Selecciona un género</option>
                {generosDisponibles.map((genero, id) => (
                    <option key={id} value={genero.Nombre}>{genero.Nombre}</option>
                ))}
            </select>

            {generoSeleccionado && (
                <Link to={`/FiltrarGenero/${generoSeleccionado}`}>Seleccionar genero</Link>
            )}
            <Cards videoGames={videoGames} />
        </div>
    );
}

export default HomePage;



