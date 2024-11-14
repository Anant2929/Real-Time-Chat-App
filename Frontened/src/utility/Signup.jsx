import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../Context/Authprovider";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { setUser } = useContext(AuthContext); // Use AuthContext to set user data
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors({
      ...errors,
      confirmPassword: "",
    });
  };

  const ConnectionBackened = async () => {
    try {
      const res = await axios.post("/api/user/signup", formData);
      if (res) {
        console.log(res.data);

        if (res.data) {
          alert(res.data.message);

          console.log("local storage data: " + JSON.stringify(res.data));

          localStorage.setItem("ChatAPP", JSON.stringify(res.data));
          // Update context state with the user data
          setUser(res.data); // Set the user globally

        
            navigate("/login"); // Navigate to login page after successful signup
          
        }
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      if (error.response) {
        alert("Error: " + error.response.data.error);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation logic
    const validationErrors = {};

    if (!formData.fullname) {
      validationErrors.fullname = "This field is required";
    }
    if (!formData.email) {
      validationErrors.email = "This field is required";
    }
    if (!formData.password) {
      validationErrors.password = "This field is required";
    }
    if (formData.password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
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
    <div className="flex justify-center items-center h-screen m-auto">
      <form
        className="border border-white p-8 rounded-lg bg-gray-800"
        onSubmit={handleSignUp}
      >
        <div>
          <h1 className="text-white font-bold text-2xl mb-4 text-center">
            Text <span className="text-orange-700 font-semibold">App</span>
          </h1>
        </div>
        <h1 className="text-white font-bold text-xl mb-6 text-center">
          Signup
        </h1>

        <div className="flex flex-col items-center">
          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            className="mb-2 p-2 w-64 rounded-md bg-gray-200 text-black font-medium"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <span className="text-red-500 mb-4">{errors.fullname}</span>
          )}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="mb-2 p-2 w-64 rounded-md bg-gray-200 text-black font-medium"
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
            className="mb-2 p-2 w-64 rounded-md bg-gray-200 text-black font-medium"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="text-red-500 mb-4">{errors.password}</span>
          )}

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 p-2 w-64 rounded-md bg-gray-200 text-black font-medium"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 mb-4">{errors.confirmPassword}</span>
          )}
        </div>

        <span className="text-white">
          Have an account?{" "}
          <a href="/login" className="text-orange-700 font-semibold mr-4">
            Login
          </a>
        </span>
        <button
          type="submit" // Change from "button" to "submit" to trigger form submission
          className="mt-4 bg-orange-700 text-white py-2 px-4 rounded-md"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
