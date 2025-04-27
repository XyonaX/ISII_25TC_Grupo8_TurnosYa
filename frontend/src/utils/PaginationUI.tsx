import React from 'react';

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
  // Genera un array con los números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mt-4">
        {pageNumbers.map(number => (
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
      </ul>
    </nav>
  );
};

export default PaginationUI;