import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul className="flex gap-5 text-xl no-underline font-bold text-gray-500 cursor-pointer">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'text-red-500' : '')}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'text-red-500' : '')}
            to="/favorites"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
