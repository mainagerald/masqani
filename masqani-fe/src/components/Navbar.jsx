import React, { useState, useRef, useCallback } from 'react';
import { BiBuilding, BiPurchaseTag, BiX } from 'react-icons/bi';
import { MdApartment, MdCreditCard, MdHome, MdMenu, MdSettings } from 'react-icons/md';
import { PiHouseLine } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimerRef = useRef(null);

  const navItems = [
    { 
      icon: <BiPurchaseTag />, 
      label: 'Buy', 
      path: '/properties-buy', 
      menus: [
        {
          title: 'Popular', 
          dropdownLinks: [
            { label: 'Apartments', to: '/properties/apartments-sale' },
            { label: 'Houses', to: '/properties/houses-sale' },
            { label: 'Commercial Property', to: '/properties/commercial-sale' },
          ]
        },
        {
          title: 'Buyer\'s Resource', 
          dropdownLinks: [
            { label: 'Affordability calculator', to: '/guide/affordability-calc' },
            { label: 'Buyer\'s guide', to: '/guide/buyer' }
          ]
        }
      ] 
    },
    { 
      icon: <MdApartment />, 
      label: 'Rent', 
      path: '/properties-rent', 
      menus: [
        {
          title: 'Property Types',
          dropdownLinks: [
            { label: 'Apartments', to: '/properties/apartments-rent' },
            { label: 'Houses', to: '/properties/houses-rent' },
            { label: 'Commercial Property', to: '/properties/commercial-rent' },
            { label: 'All Listings', to: '/properties/all-rent' },
          ]
        }
      ]
    },
    { 
      icon: <PiHouseLine />, 
      label: 'List a property', 
      path: '/properties-listprop', 
      menus: [
        {
          title: 'Seller\'s Resources',
          dropdownLinks: [
            { label: 'Find agents', to: '/agents/list' },
            { label: 'Home selling advice', to: '/guide/sellers' },
          ]
        }
      ]
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownMouseEnter = useCallback((index) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(index);
    }, 50);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  }, []);

  const handleDropdownContentMouseEnter = useCallback(() => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
  }, []);

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl text-white font-semibold">masQani</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <div
                    key={item.path}
                    className="relative group"
                    onMouseEnter={() => handleDropdownMouseEnter(index)}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <Link
                      to={item.path}
                      className="text-white hover:bg-gray-800 p-2 rounded-2xl flex items-center space-x-2 transition-all duration-200"
                    >
                      <span>{item.label}</span>
                    </Link>

                    {/* Dropdown for the item */}
                    {activeDropdown === index && (
                      <div 
                        className="absolute left-0 mt-2 w-[60vw] bg-black rounded-md shadow-lg p-4"
                        onMouseEnter={handleDropdownContentMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="flex flex-row space-x-8">
                          {item.menus.map((menu, menuIndex) => (
                            <div key={menuIndex} className="flex-1">
                              <h3 className="text-lg font-semibold mb-3 text-gray-300">
                                {menu.title}
                              </h3>
                              <div className="space-y-2">
                                {menu.dropdownLinks.map((link, linkIndex) => (
                                  <Link
                                    key={linkIndex}
                                    to={link.to}
                                    className="block font-thin text-white hover:text-gray-300 hover:underline transition-colors duration-200"
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
          <Link
              to="/news-insights"
              className="text-white hover:bg-gray-800 p-2 rounded-2xl text-sm font-medium underline"
            >
              News & Insights
            </Link>
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
              className="bg-black inline-flex items-center justify-center p-2 
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
                  px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
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