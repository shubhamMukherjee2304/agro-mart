/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import React from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-green-600 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link t0="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-50">My </span>
            <span className="text-green-50">Farm</span>
          </h1>
        </Link>
        
        <form
          onSubmit={handleSubmit}
          className='bg-slate-50 p-3 rounded-lg flex items-center'
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-50 hover:underline">
              Home
            </li>
          </Link>
          <Link to="About">
            <li className="hidden sm:inline text-slate-50 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
               <img
               className='rounded-full h-7 w-7 object-cover'
               src={currentUser.avatar}
               alt='profile'
             />
            ) : (
              <li className=" text-slate-50 hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
