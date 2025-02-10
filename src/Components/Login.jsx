import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login_bg_pic from "../assets/login_bg.avif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Test toast to verify if it works
    // toast.success("Test toast message!");

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok && data.status === 200) {
        toast.success("Login successful!");
        
        setTimeout(() => {
          navigate("/"); // Navigate to home page after showing the toast
        }, 1000);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div
      className="hero bg-base-200"
      style={{
        backgroundImage: `url(${login_bg_pic})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="text-center">
            <p>
              New to this website? please{" "}
              <u>
                <Link className="font-semibold" to="/signUp">
                  Sign Up
                </Link>
              </u>
            </p>
          </div>

          <div className="text-center">
            <p>
              Go to{" "}
              <u>
                <Link className="font-semibold" to="/">
                  Home
                </Link>
              </u>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
