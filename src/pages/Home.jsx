import React from "react";
import home_bg_pic from "../assets/home-bg-pic.jpg"
import home_bg_pic2 from "../assets/home-bg-pic-2.avif"
// import home_img from "../assets/AboutUsThree.jpeg"
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
            backgroundImage: `url(${home_bg_pic2})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="mb-5 text-7xl">Professional and Lifelong Learning</h1>
            <p className="mb-5">
              Welcome to our It Based Education and Profession. We are here to help you.
            </p>

            <div className="gap-3 grid grid-cols-3 md:grid-cols-5">
            <button className="btn btn-primary p-2">Home</button>
            <Link to="/aboutus" className="btn btn-primary p-2">About Us</Link>
            <Link to="/alldevice" className="btn btn-primary p-2">Device</Link>
            <Link to="/academic" className="btn btn-primary p-2">Academic</Link>
            <Link to="/programming" className="btn btn-primary p-2">Programming</Link>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
