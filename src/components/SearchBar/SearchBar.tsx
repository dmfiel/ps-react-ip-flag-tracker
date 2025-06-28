import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function keyHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      openSearchPage(event);
    }
    if (event.key === 'Escape') {
      setSearchText('');
    }
  }

  function openSearchPage(
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    e.preventDefault();
    navigate(`/search/${searchText}`); // Navigate to /dashboard
  }

  return (
    <form
      onSubmit={e => openSearchPage(e)}
      id="search-form"
      className="flex gap-5 w-full "
    >
      <input
        type="text"
        value={searchText}
        onChange={changeHandler}
        onKeyDown={keyHandler}
        placeholder="Search"
        className="border rounded-md py-1 px-2 w-full min-w-24 dark:bg-gray-800 dark:text-gray-300"
      />
      <button
        title="Search for recipes"
        id="search"
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 focus:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:bg-blue-600 px-3 rounded-md"
        onClick={e => openSearchPage(e)}
      >
        <MagnifyingGlassIcon className="size-6 text-blue-600 dark:text-blue-200" />
      </button>
    </form>
  );
}
