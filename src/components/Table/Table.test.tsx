import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from './Table';
import type { TableColumn, TableState } from '@/types/table.types';
import type { User } from '@/types/api.types';

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'john.com',
    company: {
      name: 'Acme Inc',
      catchPhrase: 'Innovation',
      bs: 'synergistic solutions',
    },
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    website: 'jane.com',
    company: {
      name: 'Tech Corp',
      catchPhrase: 'Excellence',
      bs: 'innovative platforms',
    },
    address: {
      street: '456 Oak Ave',
      suite: 'Suite 2',
      city: 'Los Angeles',
      zipcode: '90210',
    },
  },
];

const mockColumns: TableColumn<User>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone' },
  { key: 'website', label: 'Website' },
];

const mockState: TableState = {
  page: 1,
  pageSize: 5,
  sortBy: null,
  sortOrder: 'asc',
  searchQuery: '',
  selectedRows: [],
};

const mockOnStateChange = vi.fn();

describe('Table Component', () => {
  beforeEach(() => {
    mockOnStateChange.mockClear();
  });

  it('renders table with data', () => {
    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={1}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    expect(screen.getByTestId('reusable-table')).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <Table
        columns={mockColumns}
        data={[]}
        loading={true}
        totalPages={0}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows no data message when empty', () => {
    render(
      <Table
        columns={mockColumns}
        data={[]}
        loading={false}
        totalPages={0}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    expect(screen.getByTestId('no-data')).toBeInTheDocument();
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles column sorting', async () => {
    const user = userEvent.setup();

    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={1}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    const nameHeader = screen.getByTestId('header-name');
    await user.click(nameHeader);

    expect(mockOnStateChange).toHaveBeenCalledWith({
      sortBy: 'name',
      sortOrder: 'asc',
    });
  });

  it('handles row selection', async () => {
    const user = userEvent.setup();

    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={1}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    const rowCheckbox = screen.getByTestId('row-checkbox-1');
    await user.click(rowCheckbox);

    expect(mockOnStateChange).toHaveBeenCalledWith({
      selectedRows: [1],
    });
  });

  it('handles select all', async () => {
    const user = userEvent.setup();

    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={1}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    const selectAllCheckbox = screen.getByTestId('select-all-checkbox');
    await user.click(selectAllCheckbox);

    expect(mockOnStateChange).toHaveBeenCalledWith({
      selectedRows: [1, 2],
    });
  });

  it('displays selected rows', () => {
    const stateWithSelection = {
      ...mockState,
      selectedRows: [1],
    };

    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={1}
        onStateChange={mockOnStateChange}
        state={stateWithSelection}
      />
    );

    expect(screen.getByTestId('selected-rows')).toBeInTheDocument();
    expect(screen.getByText('Selected Rows (1):')).toBeInTheDocument();
  });

  it('handles pagination', async () => {
    const user = userEvent.setup();

    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={3}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    const nextButton = screen.getByTestId('pagination-next');
    await user.click(nextButton);

    expect(mockOnStateChange).toHaveBeenCalledWith({ page: 2 });
  });

  it('disables pagination buttons appropriately', () => {
    render(
      <Table
        columns={mockColumns}
        data={mockUsers}
        loading={false}
        totalPages={3}
        onStateChange={mockOnStateChange}
        state={mockState}
      />
    );

    const prevButton = screen.getByTestId('pagination-previous');
    const nextButton = screen.getByTestId('pagination-next');

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
