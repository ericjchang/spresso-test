export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT_ORDER = 'asc' as const;
export const DEBOUNCE_DELAY = 300;

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const URL_PARAM_KEYS = {
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
  SEARCH: 'search',
  SELECTED: 'selected',
} as const;
