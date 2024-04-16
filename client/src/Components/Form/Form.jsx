import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
    const [generos, setGeneros] = useState([]);
    const [selectedGeneros, setSelectedGeneros] = useState([]);
    const [error, setError] = useState();

    const [formData, setFormData] = useState({
        name: '',
        released: '',
        rating: '',
        img: '',
        platforms: '',
        requirements: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3001/genres')
            .then(response => {
                setGeneros(response.data);
            })
            .catch(error => {
                setError(error.message);
                console.error('Error al obtener los géneros:', error);
            });
    }, []);

    const handleGenerosChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedGeneros(selectedOptions);
    };

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:3001/videogames/create', {
                gameData: {
                    Nombre: formData.name,
                    Descripcion: formData.requirements,
                    Imagen: formData.img,
                    Fechadelanzamiento: formData.released,
                    Rating: parseFloat(formData.rating),
                    Plataformas: formData.platforms.split(',').map(platform => platform.trim()) // Convertir a array
                },
                genreData: { Nombre: selectedGeneros }
            });
            if (response.status !== 201) {
                throw new Error('Error al crear el juego');
            }
            console.log('Juego creado exitosamente');
       
            setFormData({
                name: '',
                released: '',
                rating: '',
                img: '',
                platforms: '',
                requirements: ''
            });
            setSelectedGeneros([]);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    //console.log(formData);
    return (
        <div>
            <h1>Crea un nuevo juego</h1>
            <form name="formulario" onSubmit={handleSubmit} >

                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="released">Fecha de lanzamiento:</label>
                    <input type="date" id="released" name="released" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input type="text" id="rating" name="rating" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="img">URL de la imagen:</label>
                    <input type="text" id="img" name="img" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="platforms">Plataformas:</label>
                    <input type="text" id="platforms" name="platforms" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="requirements">Descripción:</label><br />
                    <textarea id="requirements" name="requirements" rows="4" cols="50" onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label htmlFor="generos">Géneros:</label><br />
                    <select id="generos" name="generos" multiple required onChange={handleGenerosChange} value={selectedGeneros}>
                        {generos.map(genero => (
                            <option key={genero.id} value={genero.Nombre}>{genero.Nombre}</option>
                        ))}
                    </select>

                </div>
                <button type="submit">Crear Juego</button>
            </form>
        </div>
    )
}

export default Form;
