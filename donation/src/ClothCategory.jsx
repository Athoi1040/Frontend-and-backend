import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ClothCategory.css";
import FoodCategory from './FoodCategory';


const ClothCategory = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const clothItems = [
    { id: 1, name: "T-Shirt", price: "$10.00", img: "/images/cloth1.jpg" },
    { id: 2, name: "Jeans", price: "$25.00", img: "/images/cloth2.jpg" },
    { id: 3, name: "Jacket", price: "$40.00", img: "/images/cloth3.jpg" },
    { id: 4, name: "Sweater", price: "$30.00", img: "/images/cloth4.jpg" },
    { id: 5, name: "Shoes", price: "$50.00", img: "/images/cloth5.jpg" },
    { id: 6, name: "Scarf", price: "$15.00", img: "/images/cloth6.jpg" },
    { id: 7, name: "Cap", price: "$8.00", img: "/images/cloth7.jpg" },
    { id: 8, name: "Gloves", price: "$12.00", img: "/images/cloth8.jpg" },
  ];

  const handleSelect = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, item]
    );
  };

  const handleDonate = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item before donating!");
      return;
    }
    const totalAmount = selectedItems.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    navigate("/donate", { state: { amount: totalAmount.toFixed(2) } });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = clothItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cloth-category">
      <header className="cloth-header">
        <div className="container">
          <h1 className="logo">Care&Connect</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/food-donation">FoodCategory</Link>
            
          </nav>
        </div>
      </header>

      <main className="cloth-container">
        <section className="heroo">
          <div className="heroo-content">
            <h1 className="title">Find & Donate Clothes</h1>
            <p className="subtitle">Provide warmth and comfort</p>
            <button className="donate-now" onClick={handleDonate}>Donate Now</button>
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="heroo-image">
            <img src="\images2.jpg" alt="Clothing Donations" />
          </div>
        </section>

        <section className="c-category">
          <h2>Category</h2>
          <div className="cloth-items">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`cloth-card ${selectedItems.some((selected) => selected.id === item.id) ? "selected" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  <img src={item.img} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              ))
            ) : (
              <p>No clothing items found!</p>
            )}
          </div>
        </section>
      </main>

      <footer className="cloth-footer">
        <p>&copy; 2025 Cloth Category. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
          <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
          <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
        </div>
      </footer>
    </div>
  );
};

export default ClothCategory;
