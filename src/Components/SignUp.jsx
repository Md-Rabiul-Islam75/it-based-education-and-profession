import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import login_bg_pic from "../assets/login_bg.avif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the toastify styles
import { registerUser } from "../services/RegisterUserApi";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUP = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://localhost:8080/api/user/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });

      const result = await registerUser(formData.name,formData.email, formData.password);

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Registration successful!");
      } else {
        toast.error(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while registering.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${login_bg_pic})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 w-full mx-auto text-center mt-1 max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUP} className="card-body my-2">
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
                type={showPassword ? "text" : "password"}
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
            Go to{" "}
            <u>
              <Link to="/">Home</Link>
            </u>
          </p>
        </div>
      </div>

      {/* ToastContainer should be placed here or at the root of your app */}
      <ToastContainer />
    </div>
  );
};

export default SignUp;
