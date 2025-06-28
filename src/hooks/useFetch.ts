import { useEffect, useState } from 'react';

const TIMEOUT_SEC = 10;

export type FetchReturn = {
  data: any | null;
  loading: boolean;
  error: Error | null;
};

export function useFetch(
  url: string,
  options?: RequestInit,
  uploadData = undefined
): FetchReturn {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const controller = new AbortController(); // For cleanup
    let timeoutHandle: number = 0;

    async function timedFetch() {
      function timeout(s: number): Promise<Response> {
        return new Promise(function (_, reject) {
          timeoutHandle = setTimeout(function () {
            reject(() => {
              setError(
                Error(`Request took too long! Timeout after ${s} seconds`)
              );
              setLoading(false);
            });
          }, s * 1000);
        });
      }
      try {
        const fetchPro = uploadData
          ? fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(uploadData),
              ...options,
              signal: controller.signal
            })
          : fetch(url, {
              ...options,
              signal: controller.signal
            });

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        if (timeoutHandle) clearTimeout(timeoutHandle);
        if (!res.ok) {
          setError(new Error(`Network response error: ${res.status}`));
        } else {
          const data = await res.json();
          if (!data) {
            setError(new Error(`${data.message} (${res.status})`));
          } else {
            setData(data);
          }
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          // Don't set error if aborted
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    if (!url) {
      setError(new Error('Empty URL, exiting fetch'));
      setLoading(false);
    } else {
      timedFetch();
    }

    // Cleanup function
    return () => {
      controller.abort();
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [url, options, uploadData]);

  return { data, loading, error };
}
