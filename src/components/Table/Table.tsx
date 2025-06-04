import { useMemo } from 'react';
import type { TableProps, TableRow } from '@/types/table.types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { TableSearch } from './TableSearch';
import { toggleRowSelection, toggleAllRowsSelection } from '@/utils/tableHelper';
import styles from './Table.module.css';

export const Table = <T extends TableRow>({
  columns,
  data,
  loading = false,
  totalPages,
  onStateChange,
  state,
  className = '',
}: TableProps<T>) => {
  const allRowIds = useMemo(() => data.map(row => row.id), [data]);

  const handleSort = (columnKey: string) => {
    const newSortOrder = state.sortBy === columnKey && state.sortOrder === 'asc' ? 'desc' : 'asc';

    onStateChange({
      sortBy: columnKey,
      sortOrder: newSortOrder,
    });
  };

  const handleRowSelect = (rowId: string | number) => {
    const newSelectedRows = toggleRowSelection(state.selectedRows, rowId);
    onStateChange({ selectedRows: newSelectedRows });
  };

  const handleSelectAll = () => {
    const newSelectedRows = toggleAllRowsSelection(state.selectedRows, allRowIds);
    onStateChange({ selectedRows: newSelectedRows });
  };

  const handleSearch = (searchQuery: string) => {
    onStateChange({ searchQuery });
  };

  const handlePageChange = (page: number) => {
    onStateChange({ page });
  };

  const selectedRowsData = useMemo(() => {
    return data.filter(row => state.selectedRows.includes(row.id));
  }, [data, state.selectedRows]);

  return (
    <div className={`${styles.tableContainer} ${className}`} data-testid='reusable-table'>
      <TableSearch
        value={state.searchQuery}
        onChange={handleSearch}
        placeholder='Search by name, email, or username...'
      />

      <div className='overflow-x-auto'>
        <table className={styles.table} data-testid='data-table'>
          <TableHeader
            columns={columns}
            sortBy={state.sortBy}
            sortOrder={state.sortOrder}
            onSort={handleSort}
            selectedRows={state.selectedRows}
            allRowIds={allRowIds}
            onSelectAll={handleSelectAll}
          />
          <TableBody
            columns={columns}
            data={data}
            loading={loading}
            selectedRows={state.selectedRows}
            onRowSelect={handleRowSelect}
          />
        </table>
      </div>

      <TablePagination currentPage={state.page} totalPages={totalPages} onPageChange={handlePageChange} />

      {state.selectedRows.length > 0 && (
        <div className={styles.selectedRowsContainer} data-testid='selected-rows'>
          <h3 className={styles.selectedRowsTitle}>Selected Rows ({state.selectedRows.length}):</h3>
          <pre className={styles.selectedRowsJson}>{JSON.stringify(selectedRowsData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
