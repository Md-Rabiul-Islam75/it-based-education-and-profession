import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  const Name = (
    <>
      <h3 className="font-bold text-xl text-white">
        Computer Science and Engineering, MBSTU.
      </h3>
    </>
  );

  return (
    <div className="sticky top-0">
       <div className="navbar bg-blue-950">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-500 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              {Name}
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl text-white no-underline">EduTech</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">{Name}</ul>
        </div>
        <div className="navbar-end space-x-4">
          <Link
            to="/signUp"
            className="text-xl text-white font-bold no-underline hover:text-pink-500"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            className="text-xl text-white font-bold no-underline hover:text-pink-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
