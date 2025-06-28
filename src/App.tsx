import './App.css';
import { useContext } from 'react';
import ThemeProvider, {
  ThemeButton,
  ThemeContext
} from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

function ThemeWrapper() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      id="all"
      className={`${theme} w-full h-full bg:white dark:bg-black text-black dark:text-white flex flex-col min-h-screen px-5 pt-5`}
    >
      <header className="grid grid-cols-3">
        <div></div>
        <h1 className="text-3xl font-bold text-center">
          IP Address Tracker with Flags
        </h1>
        <div className="text-end">
          <ThemeButton />
        </div>
      </header>
      <main className="mx-auto my-5 flex-1 flex flex-col gap-5 items-center">
        <p>Put content here</p>
      </main>
      <footer role="contentinfo">
        <a
          href="https://www.flaticon.com/free-icons/letter-f"
          title="letter f icons"
          target="_blank"
          className="text-center text-xs text-gray-500"
        >
          <p>Letter f icons created by rashedul.islam - Flaticon</p>{' '}
        </a>{' '}
      </footer>{' '}
    </div>
  );
}
export default App;
