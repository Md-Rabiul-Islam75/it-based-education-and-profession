import React from "react";
import home_bg_pic from "../assets/home-bg-pic.jpg"

const Home = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
            backgroundImage: `url(${home_bg_pic})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="mb-5 text-7xl">Professional and Lifelong Learning</h1>
            <p className="mb-5">
              Welcome to our It Based Education and Profession. We are here to help you.
            </p>

            <div className="flex gap-3">
            <button className="btn btn-secondary">Home</button>
            <button className="btn btn-secondary">About Us</button>
            <button className="btn btn-secondary">Device</button>
            <button className="btn btn-secondary">Academic</button>
            <button className="btn btn-secondary">Programming</button>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;