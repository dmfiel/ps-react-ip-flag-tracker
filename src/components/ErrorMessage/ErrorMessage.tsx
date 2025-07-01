import { useContext } from 'react';
import { ErrorContext } from '../../context/ErrorContext';

export function ErrorMessage() {
  const { errorMessage } = useContext(ErrorContext);
  if (!errorMessage) return;
  return (
    <div
      id="error"
      className="text-base lg:text-3xl text-red text-center box-border"
      aria-live="polite"
    >
      {errorMessage}
    </div>
    // <h1 className="text-red-500 text-semibold my-10 mx-auto items-center text-center">
    //   {errorMessage}
    // </h1>
  );
}
