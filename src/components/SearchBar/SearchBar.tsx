import { useContext, useState } from 'react';
import { ErrorContext } from '../../context/ErrorContext';

export function SearchBar({
  setIpaddr
}: {
  setIpaddr: (_ipaddr: string) => void;
}) {
  const { setError } = useContext(ErrorContext);
  const [searchText, setSearchText] = useState('');

  function keyHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      searchForIPAddr(event);
    }
    if (event.key === 'Escape') {
      setSearchText('');
    }
  }

  function searchForIPAddr(
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    e.preventDefault();
    setError('');
    setIpaddr(searchText);
  }

  return (
    <form
      onSubmit={e => searchForIPAddr(e)}
      id="search-form"
      className="w-full px-5 box-border flex flex-nowrap mb-[135px] items-start"
    >
      <label className="hidden" htmlFor="ipaddr">
        IP Address or Domain
      </label>
      <input
        autoFocus={true}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={keyHandler}
        type="text"
        id="ipaddr"
        placeholder="Search for any IP address or domain"
        className="w-full lg:w-[400px] box-border bg-white hover:bg-very-light-gray text-lg box-border text-black p-[15px] border border-dark-gray rounded-l-2xl"
      />
      <button
        id="search"
        className="font-rubik bg-black hover:bg-very-dark-gray px-5 h-[60px] rounded-r-2xl text-lg font-bold"
      >
        <img
          src="http://fiel.us/ip-tracker/images/icon-arrow.svg"
          alt="Submit"
        />
      </button>
    </form>
  );
}
