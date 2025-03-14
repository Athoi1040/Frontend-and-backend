import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save user data including role in localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    alert("Sign-up successful! You can now sign in.");
    navigate("/signin"); // Redirect to SignIn
  };

  const handleCancel = () => {
    // Reset the form data
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user", // Reset to default role
    });
    navigate("/"); // Optionally, navigate to home or another page
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="button-container">
          <button type="submit">Register</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
        <p>Already registered? <a href="/signin">Sign In</a></p>
      </form>
    </div>
  );
};

export default Signup;
