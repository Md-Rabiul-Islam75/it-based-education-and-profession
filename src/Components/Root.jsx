import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';

const Root = () => {
    return (
        <div >
           <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Root;
