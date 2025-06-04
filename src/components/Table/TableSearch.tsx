import React from 'react';
import { Input } from '@/components/ui/Input';
import type { SearchProps } from '@/types/table.types';

export const TableSearch: React.FC<SearchProps> = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className='mb-4'>
      <Input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className='max-w-sm'
        data-testid='table-search'
      />
    </div>
  );
};
