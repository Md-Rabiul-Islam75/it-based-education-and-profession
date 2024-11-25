import React from 'react';

const Navbar = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content bg-base-100 rounded-box space-x-3 z-[1] mt-3 w-52 p-2 shadow">
        <li className='btn btn-accent'><a>Devices</a></li>
        <li>
          <a className='btn btn-accent'>Courses</a>
          <ul className="p-2 text-green-500">
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            
          </ul>
        </li>
        <li className='btn btn-accent'><a>Support</a></li>
      </ul>
    </div>
    <a className="btn btn-accent text-xl">EduTech</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal menu-md z-[2] px-1 space-x-3">
    <li className='btn btn-accent'><a>Devices</a></li>
      <li>
        <details>
          <summary className='btn btn-accent text-3xl'>Courses</summary>
          <ul className="p-2 text-pink-800 bg-teal-400">
          <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
            <li><a>First Year First Semester</a></li>
          </ul>
        </details>
      </li>
      <li className='btn btn-accent'><a>Support</a></li>
    </ul>
  </div>
  <div className="navbar-end space-x-3">
    <a className="btn btn-secondary">Register</a>
    <a className="btn btn-primary">Login</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;