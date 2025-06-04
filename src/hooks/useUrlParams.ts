import { useCallback, useEffect, useState } from 'react';
import { TableState } from '@/types/table.types';
import { parseUrlParams, buildUrlParams } from '@/utils/tableHelper';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams(window.location.search));

  const updateUrl = useCallback((state: TableState) => {
    const params = buildUrlParams(state);
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;

    window.history.replaceState({}, '', newUrl);
    setSearchParams(params);
  }, []);

  const getParamsFromUrl = useCallback((): Partial<TableState> => {
    const currentParams = new URLSearchParams(window.location.search);
    return parseUrlParams(currentParams);
  }, []);

  //listen back / forward browser
  useEffect(() => {
    const handlePopState = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    searchParams,
    updateUrl,
    getParamsFromUrl,
  };
};
