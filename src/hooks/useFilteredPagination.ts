// src/hooks/useFilteredPagination.ts
import { useQueryParams } from './useQueryParams';

interface PaginationParams {
  page: string;
  categoryId?: string;
}

interface PaginationOptions {
  itemsPerPage: number;
}

export const useFilteredPagination = <T extends { categoryId: string }>(
  items: T[],
  options: PaginationOptions
) => {
  const { params, setParams } = useQueryParams<PaginationParams>();
  const currentPage = parseInt(params.page || '1');
  const categoryFilter = params.categoryId;

  const filteredItems = categoryFilter
    ? items.filter(item => item.categoryId === categoryFilter)
    : items;

  const totalPages = Math.ceil(filteredItems.length / options.itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * options.itemsPerPage,
    currentPage * options.itemsPerPage
  );

  const setPage = (page: number) => {
    setParams({ ...params, page: page.toString() });
  };

  const setCategory = (categoryId: string | undefined) => {
    setParams({ 
      ...params, 
      categoryId,
      page: '1' // Reset to first page when changing category
    });
  };

  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    setPage,
    categoryFilter,
    setCategory
  };
};