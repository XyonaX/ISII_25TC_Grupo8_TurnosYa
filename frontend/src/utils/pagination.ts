export interface PaginationResult<T> {
    currentItems: T[];
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
  }
  
  export const paginate = <T>(
    items: T[],
    currentPage: number,
    itemsPerPage: number
  ): PaginationResult<T> => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    return {
      currentItems,
      totalPages,
      itemsPerPage,
      currentPage
    };
  };
  
  export const getPageNumbers = (totalPages: number): number[] => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };