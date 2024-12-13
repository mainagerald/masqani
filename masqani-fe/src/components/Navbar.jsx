import React, { useState } from 'react';
import { BiBuilding, BiX } from 'react-icons/bi';
import { MdCreditCard, MdHome, MdMenu, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: <BiBuilding />, label: 'Properties', path: '/properties' },
    { icon: <MdCreditCard />, label: 'Billing', path: '/billing' },
    { icon: <MdSettings />, label: 'Settings', path: '/settings' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <span className="text-3xl text-white font-bold">masQani</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-white hover:bg-gray-800 
                      p-2 rounded-2xl flex items-center space-x-2 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-white hover:bg-gray-800 p-2 rounded-2xl text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-black bg-white rounded-2xl hover:bg-neutral-200 hover:text-black p-2 text-sm font-medium"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 
                rounded-md text-white hover:bg-gray-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <BiX className="block h-6 w-6" /> : <MdMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white hover:bg-gray-700 
                  block px-3 py-2 rounded-md text-base font-medium items-center space-x-2"
                onClick={toggleMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
