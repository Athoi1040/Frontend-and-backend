


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-up successful! Please sign in.");
        navigate("/signin"); // Redirect to login
      } else {
        alert(data.error || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Error signing up. Please try again.");
    }
};

  const handleCancel = () => {
    setFormData({ name: "", email: "", password: "", role: "user" });
    navigate("/");
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

export default SignUp;


/*import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {  // 'await' works inside async function
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
      navigate("/signin"); // Redirect to Sign-in page
  } catch (error) {
      alert('Error signing up');
  }
    /* Save user data including role in localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    alert("Sign-up successful! You can now sign in.");
    navigate("/signin"); // Redirect to SignIn*/
  /*};

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

export default Signup;*/