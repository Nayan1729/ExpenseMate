import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.user.username);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close the dropdown if clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-500 text-white fixed top-0 w-full flex justify-between items-center px-6 py-2 z-50 shadow-lg mb-20">
     
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="App Logo" className="h-8 w-8" /> 
          <span className="text-l font-semibold">ExpenseMate</span>
        </Link>
      </div>

      {/* Profile Icon and Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div onClick={toggleDropdown} className="cursor-pointer flex items-center space-x-2">
          <span>{username}</span>
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-3 w-40 bg-white text-gray-800  shadow-lg">
            <button
              onClick={() => navigate('/profile')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Your Profile
            </button>
            <button
              onClick={() => alert("Logged Out")} // Replace with log out function
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
