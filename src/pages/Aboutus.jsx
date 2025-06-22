import React from "react";
import about_us_one from "../assets/AboutUsOne.jpeg"
import about_us_two from "../assets/AboutUsTwo.jpeg"
import about_us_three from "../assets/AboutUsThree.jpeg"
import { Link } from "react-router";



const AboutUs = () => {
  return (
    <div className="my-5 space-y-5">
      {/* first cart */}
      <div className="hero bg-base-200 min-h-80">
        <div className="hero-content flex-col shadow-2xl gap-5 lg:flex-row space-x-20">
          
        <div>
            <h1 className="text-5xl font-bold">About Us!</h1>
            <p className="py-6 text-xl">
            We are a passionate team committed to bridging the gap between academia and the professional world for Computer Science and Engineering (CSE) students. Our platform offers personalized resources, expert guidance, and interactive tools to help students navigate their academic journey, enhance their technical skills, and prepare for successful careers in technology. By combining insights from industry professionals and senior students, we aim to create a trusted space for learning and growth.
            </p>
        
          </div>

          <img 
            src={about_us_three}
            className="max-w-md rounded-lg"
          />
          
        </div>
      </div>

       {/* second cart */}
      <div className="hero bg-base-200 min-h-80">
        <div className="hero-content flex-col-reverse shadow-2xl gap-5 lg:flex-row space-x-20">

        <img
            src={about_us_two}
            className="max-w-md w-full rounded-lg"
          />
          
        <div>
            <h1 className="text-5xl font-bold">Our Mission</h1>
            <p className="py-6 text-xl">
            To empower CSE students with a comprehensive, secure, and innovative platform that simplifies their academic journey, strengthens their technical foundations, and equips them with the knowledge and tools needed to excel in competitive job markets.
            </p>
        
          </div>

         
          
        </div>
      </div>

      {/* third cart */}
      <div className="hero bg-base-200 min-h-80">
        <div className="hero-content flex-col shadow-2xl gap-5 lg:flex-row space-x-20">
          
        <div>
            <h1 className="text-5xl font-bold">Our Vision</h1>
            <p className="py-6 text-xl">
            To be recognized globally as the leading platform for CSE students, setting a benchmark for innovation and practicality in academic and career preparation. Our vision is to create a community-driven ecosystem where students, professionals, and educators collaborate to inspire growth, share knowledge, and drive technological excellence.
            </p>
        
          </div>

          <img
            src={about_us_three}
            className="max-w-md w-full rounded-lg"
          />
          
        </div>
      </div>

       <h2 className="font-bold text-center">Back to <Link className="text-blue-500" to={'/'}>Home</Link></h2>

      
    </div>
  );
};

export default AboutUs;
