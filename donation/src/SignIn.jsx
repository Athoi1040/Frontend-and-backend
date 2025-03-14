import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      formData.email === storedUser.email &&
      formData.password === storedUser.password
    ) {
      console.log("Login Successful");

      // Save authentication to localStorage
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, role: storedUser.role }));

      // Redirect based on user role
      if (storedUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/"); // Redirect non-admin users to home
      }
    } else {
      alert("Invalid email or password");
    }
  };

  const handleCancel = () => {
    setFormData({ email: "", password: "" });
    navigate("/");
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default SignIn;
