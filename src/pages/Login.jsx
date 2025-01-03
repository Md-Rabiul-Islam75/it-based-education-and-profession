import React from 'react';
import { Link } from 'react-router';
import login_bg_pic from '../assets/login_bg.avif'

const Login = () => {

    const handleLogin = e => {
        e.preventDefault();
    }

    return (
        <div className="hero bg-base-200"
        style={{
                    backgroundImage: `url(${login_bg_pic})`,
                    backgroundRepeat: "no-repeat",
                    
                   
                }}
        >
        <div className="hero-content flex-col lg:flex-row-reverse">
          
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <form  onSubmit={handleLogin} className="card-body">
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
  
  
           <div className='text-center'>
           <p>New to this website? please <u><Link className='font-semibold' to="/signUp">Sign Up</Link></u></p>
           </div>
          
           
           <div className='text-center'>
              <p>Go to <u><Link className='font-semibold' to="/">Home</Link></u></p>
           </div>
          
  
  
          </div>
        </div>
      </div>
    );
};

export default Login;