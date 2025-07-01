import { useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  value: T,
  setValue: (value: T) => void,
  setFoundLocal: (found: boolean) => void
): void {
  useEffect(() => {
    const valueJSON = localStorage.getItem(key);
    if (valueJSON) {
      setValue(JSON.parse(valueJSON));
      setFoundLocal(true);
    } else setFoundLocal(false);
  }, []);

  useEffect(() => {
    const valueJSON = localStorage.getItem(key);
    if (valueJSON) {
      setValue(JSON.parse(valueJSON));
      setFoundLocal(true);
    } else {
      setFoundLocal(false);
    }
  }, [key]);

  useEffect(() => {
    if (value) {
      const valueJSON = JSON.stringify(value);
      if (valueJSON !== '[]' && valueJSON !== '{}')
        localStorage.setItem(key, valueJSON);
    }
  }, [value]);
}
