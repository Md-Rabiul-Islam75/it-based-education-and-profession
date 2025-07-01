import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login_bg_pic from "../assets/login_bg.avif";
import { DataContext } from "../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";

//import { toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

const Login = () => {

   const { signInUser, setUser } = useContext(DataContext);
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

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
         setUser(result.user)
        alert("Logged in Successfull.");
        //navigate('/');
        navigate('/');

      })
      .catch((error) => {
        console.log(error);
      });

    // try {
    //   const response = await fetch("http://localhost:8080/api/user/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       password: formData.password,
    //     }),
    //   });
    //   const data = await response.json();
    //   if (response.ok && data.status === 200) {
    //     toast.success("Login successful!");

    //     setTimeout(() => {
    //       navigate("/"); // Navigate to home page after showing the toast
    //     }, 1000);
    //   } else {
    //     toast.error(data.message || "Login failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("An error occurred during login.");
    // }
  };

  const provider = new GoogleAuthProvider();
  const handleSignInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(result);
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        //alert("Login Successfull.");
        //console.log(result.auth?.emailVerified);
        if (user.emailVerified) {
          navigate("/");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (

    <div className="hero w-9/12 mx-auto bg-purple-200 m-10 h-[581px]">
  <div className="hero-content  flex-col lg:flex-row">
    <div className="text-center w-1/2 mx-auto lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Login and build your career like the professional. We are here to support you and always be with you. Keep faith in yourself. All the best. 
      </p>
    </div>
    {/* <div
      className="hero bg-base-200"
      // style={{
      //   backgroundImage: `url(${login_bg_pic})`,
      //   backgroundRepeat: "no-repeat",
      // }}
    > */}
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
                className="input input-bordered w-[400px]"
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
                className="input input-bordered w-[400px]"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-blue-800 hover:bg-green-500 text-white">Login</button>
            </div>
          </form>

          <div className="text-center">
            <button onClick={handleSignInWithGoogle} className="btn">
              Sign In with <FaGoogle />
            </button>
            <p>
              New to this website? please{" "}
              <u>
                <Link className="font-semibold" to="/signUp">
                  Sign Up
                </Link>
              </u>
            </p>
          </div>

          <div className="text-center py-2">
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

      {/* <ToastContainer /> */}
  </div>
</div>
   
  );
};

export default Login;
