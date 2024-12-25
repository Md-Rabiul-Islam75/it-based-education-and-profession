import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignUP = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(data.message);
        // Optionally redirect or reset form
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  };

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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="input input-bordered"
              required
            />

            <button
              type="button"
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
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="checkbox"
              />
              <span className="label-text ml-2">
                Accept Our Terms And Condition.
              </span>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              SignUp
            </button>
          </div>
        </form>

        <p>
          Already have an account? Please <Link to="/login">Login</Link>
        </p>
        <p>
          Go to <u><Link to="/">Home</Link></u>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
