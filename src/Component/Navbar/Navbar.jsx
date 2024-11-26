import React from 'react';

const Navbar = () => {
    return (
        <div className='w-11/12 mx-auto mb-3'>
            <div className="navbar bg-green-800">
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
        className="menu menu-md dropdown-content bg-green-800 rounded-box space-x-3 z-[1] mt-3 w-52 p-2 space-y-2 shadow">
          <li className='btn text-black btn-warning'><a>Home</a></li>
          <li className='btn text-black btn-warning'><a>About</a></li>
        <li className='btn text-black btn-warning'><a>Devices</a></li>
        <li>
          <a className='btn text-black btn-warning'>Courses</a>
          <ul className="p-2 text-yellow-500">
          <li><a>First Year First Semester</a></li>
            <li><a>First Year Second Semester</a></li>
            <li><a>Second Year First Semester</a></li>
            <li><a>Second Year Second Semester</a></li>
            <li><a>Third Year First Semester</a></li>
            <li><a>Third Year Second Semester</a></li>
            <li><a>Fourth Year First Semester</a></li>
            <li><a>Fourth Year Second Semester</a></li>
            
          </ul>
        </li>
        <li className='btn text-white btn-warning'><a>Support</a></li>
      </ul>
    </div>
    <a className="btn btn-warning text-xl">EduTech</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal menu-md z-[2] px-1 space-x-3">
    <li className='btn text-black btn-warning'><a>Home</a></li>
    <li className='btn text-black btn-warning'><a>About</a></li>
    <li className='btn btn-warning'><a>Devices</a></li>
      <li>
        <details>
          <summary className='btn btn-warning text-3xl'>Courses</summary>
          <ul className="p-2 text-yellow-500 font-semibold bg-lime-900">
            <li><a>First Year First Semester</a></li>
            <li><a>First Year Second Semester</a></li>
            <li><a>Second Year First Semester</a></li>
            <li><a>Second Year Second Semester</a></li>
            <li><a>Third Year First Semester</a></li>
            <li><a>Third Year Second Semester</a></li>
            <li><a>Fourth Year First Semester</a></li>
            <li><a>Fourth Year Second Semester</a></li>
          </ul>
        </details>
      </li>
      <li className='btn btn-warning'><a>Support</a></li>
    </ul>
  </div>
  <div className="navbar-end space-x-3">
    <a className="btn btn-warning">Register</a>
    <a className="btn btn-warning">Login</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;