import '../styles/Pagination.css';

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxVisiblePages = 5
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      <div className="pagination-info">
        Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} - {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultados
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-btn-prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Anterior
        </button>

        <div className="pagination-pages">
          {currentPage > 3 && (
            <>
              <button
                className="pagination-page"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
              {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
            </>
          )}

          {visiblePages.map(page => (
            <button
              key={page}
              className={`pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
              <button
                className="pagination-page"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          className="pagination-btn pagination-btn-next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Pagination;