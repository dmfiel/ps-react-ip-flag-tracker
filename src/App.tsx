import './App.css';
import { IPTracker } from './components/IPTracker/IPTracker';

function App() {
  return (
    <div
      id="all"
      className={`w-full h-full bg:white text-black flex flex-col min-h-screen`}
    >
      <main className="flex-1 flex flex-col gap-5 items-center">
        <IPTracker />
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
