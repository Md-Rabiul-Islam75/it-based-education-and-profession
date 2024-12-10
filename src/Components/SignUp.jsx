import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    
    const handleSignUP = (e) => {
        e.preventDefault();
    }

    return (
        <div className="max-w-3xl mx-auto mt-4">
        <h2 className="text-xl text-center font-bold">Please Sign Up</h2>
  
        <div className="card bg-base-100 w-full mx-auto text-center max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUP} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
  
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label justify-start cursor-pointer">
              <input type="checkbox" name="terms" className="checkbox" />
                
                <span className="label-text ml-2">Accept Our Terms And Condition.</span>
               
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">SignUp</button>
            </div>
          </form>
          
          <p>
            Already have an account? Please <Link to="/login">Login</Link>
          </p>
          <p>Go to <u><Link to="/">Home</Link></u></p>
  
        </div>
      </div>
    );
};

export default SignUp;