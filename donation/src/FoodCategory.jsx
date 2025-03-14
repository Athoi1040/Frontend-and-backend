import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./FoodCategory.css";


const FoodCategory = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const foodItems = [
    { id: 1, name: "Rice", price: "$3.00", img: "rice.jpg" },
    { id: 2, name: "Fish", price: "$7.00", img: "fish.jpg" },
    { id: 3, name: "Meat", price: "$10.00", img: "meat.jpg" },
    { id: 4, name: "Lentil", price: "$5.00", img: "lentil.jpg" },
    { id: 5, name: "Fruits", price: "$10.00", img: "fruits.jpg" },
    { id: 6, name: "Special Dish", price: "$15.00", img: "special1.jpg" },
    { id: 7, name: "Special Dish", price: "$25.00", img: "special2.jpg" },
    { id: 8, name: "Iftar", price: "$35.00", img: "ifter.jpg" },
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

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="food-category">
      <header className="food-header">
        <div className="container">
          <h1 className="logo">Care&Connect</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
             <Link to="/cloth-donation">ClothCategory</Link>
            
          </nav>
        </div>
      </header>

      <main className="food-container">
        <section className="heroo">
          <div className="heroo-content">
            <h1 className="title">Find & Donate Food</h1>
            <p className="subtitle">Give food to the needy</p>
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
            <img src="/images1.jpg" alt="Delicious Food" />
          </div>
        </section>

        <section className="f-category">
          <h2>Category</h2>
          <div className="food-items">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`food-card ${selectedItems.some((selected) => selected.id === item.id) ? "selected" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  <img src={item.img} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              ))
            ) : (
              <p>No food items found!</p>
            )}
          </div>
        </section>
      </main>

      <footer className="food-footer">
        <p>&copy; 2025 Food Category. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
          <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
          <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
        </div>
      </footer>
    </div>
  );
};

export default FoodCategory;
