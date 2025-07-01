import { useEffect, useState } from 'react';

export type WinSize = {
  width: number;
  height: number;
};

export function useWindowSize(): WinSize {
  const [winSize, setWinSize] = useState<WinSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWinSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return winSize;
}
