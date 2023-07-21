import Image from "next/image";
import { FunctionComponent, useState } from "react";
import userImage from "../../public/images/user1.jpg";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-xl font-bold text-gray-800 dark:text-white lg:text-2xl hover:text-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Brand
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300"
              aria-label="toggle menu"
              onClick={toggleMenu}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div className={`${isOpen ? "block" : "hidden"} md:flex flex-col md:flex-row md:-mx-4 hidden`}>
          <a href="#" className="my-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 md:mx-4 md:my-0">
            Home
          </a>
          <a href="#" className="my-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 md:mx-4 md:my-0">
            About
          </a>

          <a href="#" className="my-1 text-gray-700 dark:text-gray-200 hover:text-blue-500 md:mx-4 md:my-0">
            Contact
          </a>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <button
            className="flex mx-4 text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="toggle profile dropdown"
            onClick={toggleMenu}
          >
            <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
              <Image src={userImage} alt="avatar" />
            </div>

            <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">Khatab wedaa</h3>
          </button>

          {/* Profile dropdown */}
          <div className={`${isOpen ? "block" : "hidden"} md:block`}>
            <div className="relative">
              <button type="button" className="flex items-center focus:outline-none" onClick={toggleMenu}>
                <span className="hidden text-gray-700 dark:text-gray-300 md:block">Khatab wedaa</span>

                <svg
                  className="w-4 h-4 ml-2 text-gray-500 dark:text-gray-300 md:ml-0 md:w-5 md:h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                  />
                </svg>
              </button>

              {/* Profile dropdown panel, show/hide based on dropdown state. */}
              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800`}
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Your Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
