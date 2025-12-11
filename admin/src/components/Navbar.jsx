import React from "react";
import { assets } from "../assets/assets";
import { useTheme } from "./ThemeProvider";

const Navbar = ({ setToken }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='flex py-2 px-[4%] justify-between'>
      <img
        className={`w-[max(10%,80px)] ${
          theme === "dark" ? "filter invert" : ""
        }`}
        src={assets.logo}
        alt='logo'
      />
      <div className='flex items-center'>
        <button
          onClick={toggleTheme}
          className='mr-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full'
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={() => setToken("")}
          className='bg-gray-600 text-white px-3 py-2 sm:px-7 sm:py-1 rounded-full'
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
