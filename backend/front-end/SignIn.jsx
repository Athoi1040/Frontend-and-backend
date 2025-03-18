

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

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (response.ok) {
            // Save authentication details
            localStorage.setItem(
                "auth",
                JSON.stringify({ token: data.token, role: data.role, isAuthenticated: true })
            );

            // Redirect based on role
            if (data.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/"); // Redirect non-admin users
            }
        } else {
            alert(data.error || "Invalid email or password");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Error logging in. Please try again.");
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
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;










/*import React, { useState } from "react";
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

export default SignIn;*/
