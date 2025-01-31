import "../styles/MainStyle.css"; // Import your custom CSS file
import user from "../Images/user.png";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { NavLink } from "react-router-dom";

function Navbar(){
    return (
      <nav className="navbar">
      <input type="text" placeholder="Search..." />
      <div className="right-section">
        <button>
          <i className="bx bx-bell"></i>
        </button>
        <div className="userNav">
          <img src={user} alt="User Avatar" />
          <span>User Name</span>
          <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton  id="menuBtn" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-0">
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400 " />
        </MenuButton>
      </div>

      <MenuItems id="menuItems"
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-black/5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-500 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <NavLink
              to="/user-profile"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-none"
            >
              Account settings
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/contact"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Support
            </NavLink>
          </MenuItem>
          <NavLink to="/login" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                Sign out
              </button>
            </MenuItem>
          </NavLink>
        </div>
      </MenuItems>
    </Menu>
        </div>
      </div>
    </nav>
    );
}

export default Navbar