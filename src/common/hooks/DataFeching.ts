import { useEffect, useState, useCallback } from 'react';

export function useDataFetch(fetch: boolean, endPointFetch: Function) {
  const [loading, setLoading] = useState(fetch);
  const [error, setError] = useState<string | undefined | object>(undefined);
  const [result, setResult] = useState<any | undefined>(undefined);
  const fetchData = useCallback(async () => {
    try {
      const tmp = await endPointFetch();
      setResult(tmp);
    } catch (exception: any) {
      setError(exception.message);
    } finally {
      setLoading(!loading);
    }
  }, [loading, endPointFetch]);

  // fix eslint React Hook useEffect has a missing dependency: 'endPointFetch'. Either
  // include it or remove the dependency array. If 'endPointFetch' changes too
  // often, find the parent component that defines it and wrap that definition in useCallback

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading, fetchData]);

  return [loading, setLoading, error, result];
}
