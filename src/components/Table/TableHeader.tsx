import type { TableColumn } from '@/types/table.types';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (columnKey: string) => void;
  selectedRows: (string | number)[];
  allRowIds: (string | number)[];
  onSelectAll: () => void;
}

export const TableHeader = <T,>({
  columns,
  sortBy,
  sortOrder,
  onSort,
  selectedRows,
  allRowIds,
  onSelectAll,
}: TableHeaderProps<T>) => {
  const isAllSelected = selectedRows.length === allRowIds.length && allRowIds.length > 0;
  const isPartiallySelected = selectedRows.length > 0 && selectedRows.length < allRowIds.length;

  const getSortIcon = (columnKey: string): string => {
    if (sortBy !== columnKey) return '↕️';
    return sortOrder === 'asc' ? '⬆️' : '⬇️';
  };

  return (
    <thead className='bg-gray-50'>
      <tr>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
          <input
            type='checkbox'
            checked={isAllSelected}
            ref={input => {
              if (input) input.indeterminate = isPartiallySelected;
            }}
            onChange={onSelectAll}
            className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
            data-testid='select-all-checkbox'
          />
        </th>
        {columns.map(column => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
            }`}
            style={{ width: column.width }}
            onClick={column.sortable ? () => onSort(column.key) : undefined}
            data-testid={`header-${column.key}`}
          >
            <div className='flex items-center gap-1'>
              <span>{column.label}</span>
              {column.sortable && <span className='text-gray-400 text-sm'>{getSortIcon(column.key)}</span>}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
