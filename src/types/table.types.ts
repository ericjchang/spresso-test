export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

export interface TableState {
  page: number;
  pageSize: number;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  selectedRows: (string | number)[];
}

export interface TableProps<T extends TableRow> {
  columns: TableColumn<T>;
  data: T[];
  loading?: boolean;
  totalPages: number;
  onStateChange: (state: Partial<TableState>) => void;
  state: TableState;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export type SortDirection = 'asc' | 'desc' | null;
