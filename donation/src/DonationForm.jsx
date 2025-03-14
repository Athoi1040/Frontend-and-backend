import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './DonationForm.css';

const DonationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || { amount: '' }; // Default to empty if no amount is passed

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: amount,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you${formData.name ? ', ' + formData.name : ''}, for your donation of $${formData.amount}!`);
  };

  const handleCancel = () => {
    // Optionally reset form data or navigate back to the previous page
    setFormData({
      name: '',
      email: '',
      amount: amount,
    });
    navigate(-1);  // Go back to the previous page (or you can navigate to another page)
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Donate Now</h2>
        <label className="label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label className="label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
          />
        </label>
        <label className="label">
          Donation Amount ($):
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="input"
          />
        </label>
        <div className="button-container">
          <button type="submit" className="button">Donate</button>
          <button type="button" onClick={handleCancel} className="button cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
