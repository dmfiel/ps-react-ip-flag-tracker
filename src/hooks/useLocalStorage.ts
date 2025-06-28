import { useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  value: T,
  setValue: (value: T) => void
): void {
  useEffect(() => {
    console.log('getting ', key);
    const valueJSON = localStorage.getItem(key);
    if (valueJSON) {
      setValue(JSON.parse(valueJSON));
    }
    console.log(valueJSON);
  }, []);
  useEffect(() => {
    if (value) {
      console.log('saving ', key, value, typeof value, JSON.stringify(value));
      const valueJSON = JSON.stringify(value);
      if (valueJSON === '[]' || valueJSON === '{}')
        console.log('Not saving empty object in local storage', key, valueJSON);
      else localStorage.setItem(key, valueJSON);
    }
  }, [value]);
}
