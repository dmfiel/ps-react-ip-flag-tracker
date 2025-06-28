import { RotatingLines } from 'react-loader-spinner';

export function LoadingSpinner({ text }: { text?: string }) {
  return (
    <div>
      {text ? <h1>{text}</h1> : ''}
      <div className="flex justify-center mt-5">
        <RotatingLines
          visible={true}
          width="96"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </div>
  );
}
