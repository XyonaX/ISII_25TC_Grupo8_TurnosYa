import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface PaginationUIProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
}

const PaginationUI: React.FC<PaginationUIProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  disabled = false
}) => {
  // Rango de páginas a mostrar (máximo 5)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mt-4">
        {/* Botón Anterior */}
        <li className={`page-item ${currentPage === 1 || disabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => !disabled && onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            aria-label="Previous"
          >
            <FaAngleLeft />
          </button>
        </li>

        {/* Primera página (si no está visible) */}
        {!getPageNumbers().includes(1) && (
          <>
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => !disabled && onPageChange(1)}
                disabled={disabled}
              >
                1
              </button>
            </li>
            {!getPageNumbers().includes(2) && <li className="page-item disabled"><span className="page-link">...</span></li>}
          </>
        )}

        {/* Páginas visibles */}
        {getPageNumbers().map(number => (
          <li 
            key={number} 
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => !disabled && onPageChange(number)}
              disabled={disabled}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Última página (si no está visible) */}
        {!getPageNumbers().includes(totalPages) && (
          <>
            {!getPageNumbers().includes(totalPages - 1) && <li className="page-item disabled"><span className="page-link">...</span></li>}
            <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => !disabled && onPageChange(totalPages)}
                disabled={disabled}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Botón Siguiente */}
        <li className={`page-item ${currentPage === totalPages || disabled ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => !disabled && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            aria-label="Next"
          >
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationUI;