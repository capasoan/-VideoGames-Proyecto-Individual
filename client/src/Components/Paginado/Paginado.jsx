import { useState } from 'react';
import Cards from '../Cards/Cards';

const Paginado = ({ videoGames, pageSize }) => {


    const totalObjects = videoGames.length;
    //  console.log('totalObjects', totalObjects)


    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalObjects / pageSize);
    //console.log('totalPages', totalPages)


    const startIndex = (currentPage - 1) * pageSize;
    //   console.log('startIndex', startIndex)


    const endIndex = Math.min(startIndex + pageSize, totalObjects);
    // console.log('endIndex', endIndex)

    //const flatVideoGames = videoGames.flat();
    const currentObjects = videoGames.slice(startIndex, endIndex);
    //console.log('currentObjects', currentObjects)

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <Cards videoGames={currentObjects} />
            {totalObjects > 0 && (
                <div className="container">
                    <button className="btnPaginado" onClick={prevPage}>Anterior</button>
                    <span>Página {currentPage}  de {totalPages}</span>
                    <button className="btnPaginado" onClick={nextPage}>Siguiente</button>
                </div>
            )}
        </div>
    );
};

export default Paginado;


