

const Paginado = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div>
            {pages.map((page) => (
                <button>
                </button>
            ))}
        </div>
    );
};

export default Paginado;
