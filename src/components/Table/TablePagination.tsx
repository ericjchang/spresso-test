import React from 'react';
import { Button } from '@/components/ui/Button';
import type { PaginationProps } from '@/types/table.types';

export const TablePagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='flex items-center justify-between mt-4'>
      <div className='text-sm text-gray-700'>
        Page {currentPage} of {totalPages}
      </div>
      <div className='flex gap-2'>
        <Button
          variant='secondary'
          size='sm'
          onClick={handlePrevious}
          disabled={currentPage === 1}
          data-testid='pagination-previous'
        >
          Previous
        </Button>
        <Button
          variant='secondary'
          size='sm'
          onClick={handleNext}
          disabled={currentPage === totalPages}
          data-testid='pagination-next'
        >
          Next
        </Button>
      </div>
    </div>
  );
};
