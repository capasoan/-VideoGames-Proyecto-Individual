import {useState } from "react";

function SearchBar({ onSearch }) {
    const [nombre, setNombre]=useState("");

    const handleChange=(event)=>{

        const value= event.target.value;
        setNombre(value);

    }

    return (
    <div>
            <div>
                < input type='search' value={nombre} onChange={(e) => handleChange(e)} />
            </div>
            <button onClick={()=>onSearch(nombre)}>BUSCAR</button>
    </div>)
}

export default SearchBar;