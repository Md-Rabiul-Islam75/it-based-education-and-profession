import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import login_bg_pic from "../assets/login_bg.avif";
//import { toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css"; // Make sure to import the toastify styles
import { registerUser } from "../service/RegisterUserApi";
import { AuthContext } from "../providers/AuthProvider";
const SignUp = () => {
  const { createUser } = useContext(AuthContext);

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

  const handleSignUP = (e) => {
    e.preventDefault();

    //try {
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

    // signUp firebase process
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        alert("SignUp Succesffull.");
      })
      .catch((error) => {
        console.log("error", error);
      });

    //   const result = await registerUser(formData.name,formData.email, formData.password);

    //   const data = await response.json();
    //   if (response.ok) {
    //     toast.success(data.message || "Registration successful!");
    //   } else {
    //     toast.error(`Error: ${data.message || "Something went wrong"}`);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("An error occurred while registering.");
    // }
  }; 

  return (
    <div className="hero w-9/12 mx-auto bg-purple-200 m-5 h-[580px]">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Sign Up and build your career like the professional. We are here to support you and always be with you. Keep faith in yourself. All the best. 
          </p>
        </div>
        <div>
          <div className="max-w-3xl mx-auto">
            <div className="card bg-base-100 w-full mx-auto text-center mt-1 max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSignUP} className="card-body p-4 my-2">
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
                    className="input input-bordered w-[350px]"
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
                    className="input input-bordered w-[350px]"
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
                    className="input input-bordered w-[350px]"
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
                  <button type="submit" className="btn bg-blue-800 text-white">
                    SignUp
                  </button>
                </div>
              </form>

              <p className="px-2 py-1">
                Already have an account? Please{" "}
                <u className="font-bold">
                  <Link to="/login">Login</Link>
                </u>
              </p>
              {/* <p className="px-2 py-1">
                Go to{" "}
                <u className="font-bold">
                  <Link to="/">Home</Link>
                </u>
              </p> */}
            </div>
          </div>

          {/* ToastContainer should be placed here or at the root of your app */}
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
