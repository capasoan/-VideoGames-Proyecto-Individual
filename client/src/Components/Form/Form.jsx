import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { descargarDatosFormulario, descargarDatosValidaciones} from '../../redux/actions';
import { validateForm, nameRegex, ratingRegex, platformsRegex, requirementsRegex } from '../../redux/utils/formValidations';

function Form() {
    const [generos, setGeneros] = useState([]);
    const [selectedGeneros, setSelectedGeneros] = useState([]);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const validations = useSelector((state) => state.validations);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/genres')
            .then(response => {
                setGeneros(response.data);
                console.log(response.data)
            }) 
            .catch(error => {
                console.error('Error al obtener los géneros:', error);
            });
    }, []);

    const handleGenerosChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedGeneros(selectedOptions);
    };

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
  const newValue = type === 'file' ? files[0] : value;
  const newFormData = { ...formData, [name]: newValue };
  dispatch(descargarDatosFormulario(newFormData));

  if (formData && formData.name && formData.released && formData.rating && formData.platforms && formData.requirements) {
    const newValidations = validateForm(formData);
    dispatch(descargarDatosValidaciones(newValidations));
}
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    

        
        if (formData && formData.name && formData.released && formData.rating && formData.platforms && formData.requirements) {
            const newValidations = validateForm(formData);
            if (Object.keys(newValidations).length > 0) {
                dispatch(descargarDatosValidaciones(newValidations));
                return;
            }
        }
        try {
            const response = await axios.post('http://localhost:3001/videogames/create', {
                gameData: {
                    Nombre: formData.name,
                    Descripcion: formData.requirements,
                    Imagen: formData.img,
                    Fechadelanzamiento: formData.released,
                    Rating: parseFloat(formData.rating),
                    Plataformas: formData.platforms.split(',').map(platform => platform.trim())
                },
                genreData: { Nombre: selectedGeneros }
            });
            if (response.status !== 201) {
                throw new Error('Error al crear el juego');
            }
            console.log('Juego creado exitosamente');
            setSuccessMessage('¡El juego se creó exitosamente!');

            dispatch(descargarDatosFormulario({
                name: '',
                released: '',
                rating: '',
                img: '',
                platforms: '',
                requirements: ''
            }));
            setSelectedGeneros([]);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (
        <div className='form'>
    <div className='marco_form' >
        <div className='info_form' >
            <h1>CREA UN NUEVO JUEGO</h1>
            {successMessage && <p>{successMessage}</p>} 
            {!successMessage && ( 
            <form name="formulario" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name"></label>
                    <input className='campos' type="text" id="name" name="name" placeholder="Nombre"  value={formData.name} onChange={handleChange} required />
                    {validations.name && <p className='Validacion'>{validations.name}</p>}
                
                    <label htmlFor="rating"></label>
                    <input className='campos' type="text" id="rating" name="rating" placeholder="Rating"  value={formData.rating} onChange={handleChange} required />
                    {validations.rating && <p className='Validacion'>{validations.rating}</p>}
                </div>
                <div>
                    <label htmlFor="img"></label>
                    <input className='campos' type="text" id="img" name="img" placeholder="URL_IMG"    value={formData.img} onChange={handleChange} required />
                    {validations.img && <p className='Validacion'>{validations.img}</p>}
                
                    <label htmlFor="platforms"></label>
                    <input className='campos' type="text" id="platforms" name="platforms" placeholder="Platformas"  value={formData.platforms} onChange={handleChange} required />
                    {validations.platforms && <p className='Validacion'>{validations.platforms}</p>}
                
                </div>
                <div>
                    <label htmlFor="requirements"></label><br />
                    <textarea  className='campos' id="requirements" name="requirements"  placeholder="Descripción"  rows="4" cols="50" value={formData.requirements} onChange={handleChange} required></textarea>
                    {validations.requirements && <p className='Validacion'>{validations.requirements}</p>}
                
                </div>
                <div>
                    <label className='camposLabel' htmlFor="released">Lanzamiento:</label>
                    <input  className='campos' type="date" id="released" name="released"  placeholder="Fecha de lanzamiento" value={formData.released} onChange={handleChange} required />
                    {validations.released && <p className='Validacion'>{validations.released}</p>}
                    </div>
                    <div className='marco_select'>
                        <div>
                    <div><label  className='campoLabelSlect'  htmlFor="generos">Seleccionar generos:</label></div> 
                    <select className='campos' id="generos" name="generos" multiple required onChange={handleGenerosChange} value={selectedGeneros}>
                        {generos.map(genero => (
                            <option key={genero.id} value={genero.Nombre}>{genero.Nombre}</option>
                        ))}
                    </select> 
                    </div>
                

                </div><br/>
                <button className="btonForm"type="submit">Crear Juego</button>
            </form>
            )}
        </div>
        </div>
        </div>
    )
}

export default Form;