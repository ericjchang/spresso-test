import type { TableColumn, TableRow } from '@/types/table.types';
import { LoadingSpinner } from './LoadingSpinner';

interface TableBodyProps<T extends TableRow> {
  columns: TableColumn<T>[];
  data: T[];
  loading: boolean;
  selectedRows: (string | number)[];
  onRowSelect: (rowId: string | number) => void;
}

export const TableBody = <T extends TableRow>({
  columns,
  data,
  loading,
  selectedRows,
  onRowSelect,
}: TableBodyProps<T>) => {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + 1} className='px-6 py-12'>
            <LoadingSpinner size='lg' />
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + 1} className='px-6 py-12 text-center text-gray-500' data-testid='no-data'>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className='bg-white divide-y divide-gray-200'>
      {data.map((row, rowIndex) => (
        <tr
          key={row.id}
          className={`hover:bg-gray-50 ${selectedRows.includes(row.id) ? 'bg-blue-50' : ''}`}
          data-testid={`table-row-${rowIndex}`}
        >
          <td className='px-6 py-4 whitespace-nowrap'>
            <input
              type='checkbox'
              checked={selectedRows.includes(row.id)}
              onChange={() => onRowSelect(row.id)}
              className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              data-testid={`row-checkbox-${row.id}`}
            />
          </td>
          {columns.map(column => (
            <td
              key={column.key}
              className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'
              data-testid={`cell-${row.id}-${column.key}`}
            >
              {column.render ? column.render(row[column.key], row) : String(row[column.key] || '')}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
