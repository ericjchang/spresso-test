import type { TableState } from '@/types/table.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORT_ORDER } from './constants';

export const getInitialTableState = (): TableState => ({
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  sortBy: null,
  sortOrder: DEFAULT_SORT_ORDER,
  searchQuery: '',
  selectedRows: [],
});

export const parseUrlParams = (searchParams: URLSearchParams): Partial<TableState> => {
  const params: Partial<TableState> = {};

  const page = searchParams.get('page');
  if (page && !isNaN(Number(page))) {
    params.page = Math.max(1, Number(page));
  }

  const pageSize = searchParams.get('pageSize');
  if (pageSize && !isNaN(Number(pageSize))) {
    params.pageSize = Math.max(1, Number(pageSize));
  }

  const sortBy = searchParams.get('sortBy');
  if (sortBy) {
    params.sortBy = sortBy;
  }

  const sortOrder = searchParams.get('sortOrder');
  if (sortOrder === 'asc' || sortOrder === 'desc') {
    params.sortOrder = sortOrder;
  }

  const search = searchParams.get('search');
  if (search) {
    params.searchQuery = search;
  }

  const selected = searchParams.get('selected');
  if (selected) {
    try {
      params.selectedRows = JSON.parse(selected);
    } catch {
      params.selectedRows = [];
    }
  }

  return params;
};

export const buildUrlParams = (state: TableState): URLSearchParams => {
  const params = new URLSearchParams();

  if (state.page !== DEFAULT_PAGE) {
    params.set('page', state.page.toString());
  }

  if (state.pageSize !== DEFAULT_PAGE_SIZE) {
    params.set('pageSize', state.pageSize.toString());
  }

  if (state.sortBy) {
    params.set('sortBy', state.sortBy);
  }

  if (state.sortOrder !== DEFAULT_SORT_ORDER) {
    params.set('sortOrder', state.sortOrder);
  }

  if (state.searchQuery) {
    params.set('search', state.searchQuery);
  }

  if (state.selectedRows.length > 0) {
    params.set('selected', JSON.stringify(state.selectedRows));
  }

  return params;
};

export const toggleRowSelection = (selectedRows: (string | number)[], rowId: string | number): (string | number)[] => {
  if (selectedRows.includes(rowId)) {
    return selectedRows.filter(id => id !== rowId);
  }
  return [...selectedRows, rowId];
};

export const toggleAllRowsSelection = (
  selectedRows: (string | number)[],
  allRowIds: (string | number)[]
): (string | number)[] => {
  if (selectedRows.length === allRowIds.length) {
    return [];
  }
  return [...allRowIds];
};
