import { useEffect, useState } from 'react';
import { useFetch, type FetchReturn } from './useFetch';
import { useLocalStorage } from './useLocalStorage';

export function useLocalThenFetch(
  url: string,
  options?: RequestInit,
  uploadData = undefined
): FetchReturn {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [localData, setLocalData] = useState<any>(null);
  const [foundLocal, setFoundLocal] = useState<boolean | null>(null); // null -> try local storage, true -> data found in local storage, false -> use API fetch
  useLocalStorage(url, localData, setLocalData, setFoundLocal);

  const [fetchURL, setFetchURL] = useState('');
  const fetchReturn = useFetch(fetchURL, options, uploadData);

  useEffect(() => {
    console.log('foundLocal', foundLocal);
    if (foundLocal === true) {
      setLoading(false);
      setData(localData);
      setFetchURL('');
    }
    if (foundLocal === false) setFetchURL(url);
  }, [foundLocal]);

  useEffect(() => {
    console.log('fetchReturn changed', fetchReturn);
    console.log('foundLocal', foundLocal);
    if (!url) return;
    if (foundLocal !== false) return;
    setLoading(fetchReturn.loading);
    if (fetchReturn.loading) return;
    setData(fetchReturn.data);
    setError(fetchReturn.error);
    setLocalData(fetchReturn.data);
  }, [fetchReturn]);

  return { data, loading, error };
}
