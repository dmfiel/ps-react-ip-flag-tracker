import React, { useState, type ReactNode } from 'react';

export const ErrorContext = React.createContext({
  errorMessage: '',
  setError: (_errorMessage: string): void => undefined
});

function ErrorProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setError] = useState<string>('');

  return (
    <ErrorContext.Provider value={{ errorMessage, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;
