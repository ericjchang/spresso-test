import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types/api.types';
import type { TableState } from '@/types/table.types';
import { fetchUser } from '@/utils/api';
import { debounce } from 'lodash';
import { DEBOUNCE_DELAY } from '@/utils/constants';

interface UseTableDataReturn {
  data: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  refetch: () => void;
}

export const useTableData = (state: TableState): UseTableDataReturn => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchUser(state.page, state.pageSize, state.searchQuery, state.sortBy, state.sortOrder);

      setData(res.data);
      setTotalPages(res.pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [state.page, state.pageSize, state.searchQuery, state.sortBy, state.sortOrder]);

  const debouncedFetchData = useCallback(debounce(fetchData, DEBOUNCE_DELAY), [fetchData]);

  useEffect(() => {
    if (state.searchQuery) {
      debouncedFetchData();
    } else {
      fetchData();
    }

    // cleanup on unmount
    return () => {
      debouncedFetchData.cancel();
    };
  }, [fetchData, debouncedFetchData, state.searchQuery]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    totalPages,
    refetch,
  };
};
