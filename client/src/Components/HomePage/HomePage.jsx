import { useState, useEffect } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onSearch, filtrarPorGenero, ordenarNombreDescendente,ordenarNombreAscendente, odenarRatingDescendente, odenarRatingAscendente } from "../../redux/actions";
import Paginado from '../Paginado/Paginado';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
    const [generosDisponibles, setGenerosDisponibles] = useState([]);
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');
    const [ordenamiento, setOrdenamiento] = useState('');
    const navigate = useNavigate();

    
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
        navigate(`/FiltrarGenero/${nombreGenero}`);
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


const videoGamesNested = useSelector(state => state.videoGames);
const videoGames = videoGamesNested.flat();


console.log(videoGames)
    
return (
<div className='homepage-container'>
    <div className='burbuja'>

        <h1 className='titulo'>All games you can find</h1>
        <div>
            <SearchBar onSearch={handleSearch} />
        </div>
                        <div className='imagenHome'></div>
                        
        <div className="filters">
            <select value={generoSeleccionado} onChange={(e) => handleSeleccionarGenero(e.target.value)} className="select">
                <option value="">Selecciona un género</option>
                {generosDisponibles.map((genero, id) => (
                    <option key={id} value={genero.Nombre}>{genero.Nombre}</option>
                ))}
            </select>

            <select value={ordenamiento} onChange={(e) => handleOrdenar(e.target.value)} className="select">
                <option value="">Ordenar</option>
                <option value="letraAs">Nombre ascendente</option>
                <option value="letraDes">Nombre descendente</option>
                <option value="numeroAs">Rating ascendente</option>
                <option value="numeroDes">Rating descendente</option>
            </select>
        </div>
        </div>
        <div className="tarjetas">

            <div className='paginado'>
            <Paginado videoGames={videoGames} pageSize={15} />
            </div>
        
        </div>

</div>
);


}

export default HomePage;
