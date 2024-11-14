import React, { useState, useContext } from "react"; // Import useContext from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { AuthContext } from '../Context/Authprovider';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate for redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error when user types
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const ConnectionBackened = async () => {
    try {
      const res = await axios.post(
        "/api/user/login",
        formData
      );
      if (res) {
        console.log(res.data);
        if (res.data) {
          alert(res.data.message);
        }
        localStorage.setItem("ChatAPP", JSON.stringify(res.data));
        setUser(res.data);
        if(res.status===201){
        navigate('/');} // Redirect to home or any other page after login
      }
    } catch (error) {
      // Extract backend error message and display it in alert
      const backendErrorMessage =
        error.response?.data?.error || error.message || "Login failed";
      alert("Error: " + backendErrorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "This field is required";
    }
    if (!formData.password) {
      validationErrors.password = "This field is required";
    }

    // If validation errors exist, set them and return early
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with form submission logic (e.g., API call)
    await ConnectionBackened();
  };

  return (
    <div className="flex justify-center items-center m-auto h-screen">
      <form
        onSubmit={handleSubmit}
        className="border border-white p-8 rounded-lg bg-gray-800"
      >
        <div>
          <h1 className="text-white font-bold text-2xl mb-4 text-center">
            Text <span className="text-orange-700 font-semibold">App</span>
          </h1>
        </div>
        <h1 className="text-white font-bold text-xl mb-6">Login</h1>

        {/* Container to center inputs */}
        <div className="flex flex-col items-center">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-2 w-64 rounded-md bg-gray-200 text-black font-medium"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="text-red-500 mb-4">{errors.email}</span>
          )}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 w-64 rounded-md bg-gray-200 text-black font-medium"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-red-500 mb-4">{errors.password}</span>
          )}
        </div>

        <span className="text-white">
          New User?{" "}
          <Link to="/signup" className="text-orange-700 font-semibold mr-4">
            Signup
          </Link>
        </span>

        {/* Login Button */}
        <button
          type="submit"
          className="mt-4 bg-orange-700 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
