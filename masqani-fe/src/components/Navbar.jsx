import React, { useState } from 'react';
import { BiBuilding, BiX } from 'react-icons/bi';
import { MdCreditCard, MdHome, MdMenu, MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: <MdHome />, label: 'Home', path: '/' },
    { icon: <BiBuilding />, label: 'Properties', path: '/properties' },
    { icon: <MdCreditCard />, label: 'Billing', path: '/billing' },
    { icon: <MdSettings />, label: 'Settings', path: '/settings' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-700">Masqani</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-primary-600 hover:bg-primary-100 hover:text-primary-900 
                    px-3 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary-100 inline-flex items-center justify-center p-2 
                rounded-md text-primary-600 hover:text-primary-900 hover:bg-primary-200 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
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
                className="text-primary-600 hover:bg-primary-100 hover:text-primary-900 
                  block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
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