import { Table } from '@/components/Table';
import { useTableState } from '@/hooks/useTableState';
import { useTableData } from '@/hooks/useTableData';
import type { TableColumn } from '@/types/table.types';
import type { User } from '@/types/api.types';
import './App.css';

const columns: TableColumn<User>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    width: '200px',
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    width: '250px',
    render: (value: string) => (
      <a href={`mailto:${value}`} className='text-blue-600 hover:text-blue-800'>
        {value}
      </a>
    ),
  },
  {
    key: 'phone',
    label: 'Phone',
    width: '150px',
    render: (value: string) => <span className='font-mono text-sm'>{value}</span>,
  },
  {
    key: 'website',
    label: 'Website',
    width: '150px',
    render: (value: string) => (
      <a
        href={`https://${value}`}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-600 hover:text-blue-800'
      >
        {value}
      </a>
    ),
  },
  {
    key: 'company.name',
    label: 'Company',
    sortable: true,
    width: '200px',
    render: (value: string, row: User) => (
      <div>
        <div className='font-medium'>{row.company.name}</div>
        <div className='text-sm text-gray-500'>{row.company.catchPhrase}</div>
      </div>
    ),
  },
];

function App() {
  const { state, updateState } = useTableState();
  const { data, loading, error, totalPages, refetch } = useTableData(state);

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>Error</h2>
          <p className='text-gray-600 mb-4'>{error}</p>
          <button onClick={refetch} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <Table
            columns={columns}
            data={data}
            loading={loading}
            totalPages={totalPages}
            onStateChange={updateState}
            state={state}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
