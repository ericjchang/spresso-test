import { useState, useCallback, useEffect } from 'react';
import type { TableState } from '@/types/table.types';
import { getInitialTableState } from '@/utils/tableHelper';
import { useUrlParams } from './useUrlParams';

export const useTableState = () => {
  const { updateUrl, getParamsFromUrl } = useUrlParams();

  const [state, setState] = useState<TableState>(() => {
    const initialState = getInitialTableState();
    const urlParams = getParamsFromUrl();
    return { ...initialState, ...urlParams };
  });

  const updateState = useCallback((updates: Partial<TableState>) => {
    setState(prevState => {
      const newState = { ...prevState, ...updates };

      // reset page when search / sort
      if (updates.searchQuery !== undefined || updates.sortBy !== undefined || updates.sortOrder !== undefined) {
        newState.page = 1;
      }

      return newState;
    });
  }, []);

  useEffect(() => {
    updateUrl(state);
  }, [state, updateUrl]);

  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = getParamsFromUrl();
      setState(prevState => ({ ...prevState, ...urlParams }));
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [getParamsFromUrl]);

  return {
    state,
    updateState,
  };
};
