import "../styles/Dashboard.css";
import KpiCard from "../components/KpiCard";
import AreaChart from "../charts/AreaChart";

import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantMap from "../components/RestaurantMap";
import CuisineChart from "../charts/CuisineChart";
import { NavLink } from "react-router-dom";
import ReviewChart from "../charts/ReviewChart";
function Dashboard() {
  const [kpis, setKpis] = useState({});
  const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
const [topRestaurants, setTopRestaurants] = useState([]);
const [areas, setAreas] = useState([]);
const [mapRestaurants, setMapRestaurants] = useState([]);
const [cuisines, setCuisines] = useState([]);
const [selectedArea, setSelectedArea] = useState("All");
const [topReviews, setTopReviews] = useState([]);
const [selectedRestaurant, setSelectedRestaurant] = useState(null);
const [showPopup, setShowPopup] = useState(false);
useEffect(() => {
  axios
    .get("http://localhost:5000/api/topreviews")
    .then((res) => setTopReviews(res.data))
    .catch((err) => console.log(err));
}, []);
useEffect(() => {
  axios
    .get("http://localhost:5000/api/cuisines")
    .then((res) => setCuisines(res.data))
    .catch((err) => console.log(err));
}, []);
useEffect(() => {
  axios
    .get("http://localhost:5000/api/maprestaurants")
    .then((res) => {
      setMapRestaurants(res.data);
    })
    .catch((err) => console.log(err));
}, []);
useEffect(() => {
  axios
    .get("http://localhost:5000/api/areas")
    .then((res) => {
      setAreas(res.data);
    })
    .catch((err) => console.log(err));
}, []);
useEffect(() => {
  axios
    .get("http://localhost:5000/api/toprated")
    .then((res) => {
      setTopRestaurants(res.data);
    })
    .catch((err) => console.log(err));
}, []);

useEffect(() => {
  axios
    .get("http://localhost:5000/api/kpis")
    .then((res) => {
      setKpis(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
useEffect(() => {
  if (!search) {
    setResults([]);
    return;
  }

  axios
    .get(`http://localhost:5000/api/search/${search}`)
    .then((res) => {
      setResults(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [search]);
const filteredRestaurants =
  selectedArea === "All"
    ? topRestaurants
    : topRestaurants.filter(
        (restaurant) => restaurant.area === selectedArea
      );
      const filteredAreas =
  selectedArea === "All"
    ? areas
    : areas.filter(
        (area) => area.area === selectedArea
      );
      console.log("Popup:", showPopup);
console.log("Restaurant:", selectedRestaurant);
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo-icon">🍽️</span>
          <div>
            <h2 className="logo-text">FoodIQ</h2>
            <span className="logo-subtext">Restaurant Intelligence</span>
          </div>
        </div>

        <nav className="nav-container">
          <div className="nav-section">
  <span className="section-title">MAIN</span>
<NavLink
  to="/"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <span className="icon">🏠</span>
  Dashboard
</NavLink>

<NavLink
  to="/restaurants"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <span className="icon">🍽️</span>
  Restaurants
</NavLink>

<NavLink
  to="/analytics"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <span className="icon">📊</span>
  Analytics
</NavLink>

<NavLink
  to="/reviews"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  <span className="icon">⭐</span>
  Reviews
</NavLink>
</div>

       </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header Row */}
        <header className="topbar">
          <div className="welcome-text">
            <h1>Hello Bengaluru People! 👋</h1>
            <p>Find best restaurants near you, Don't get disappointed without visiting this dashboard!! 😉</p>
          </div>

          <div className="topbar-right">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
             <input
  type="text"
  placeholder="Search restaurants, areas..."
  className="search-box"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
{results.length > 0 && (
  <div className="search-results">
    {results.slice(0, 5).map((item, index) => (
      <div
  key={index}
  className="search-result-item"
 onClick={() => {
  setSelectedArea(item.area);
  setSelectedRestaurant(item);
  setShowPopup(true);
  setSearch(item.restaurant_name);
  setResults([]);
}}
  style={{ cursor: "pointer" }}
>
        <strong>{item.restaurant_name}</strong>
        <br />
        ⭐ {item.google_rating} • {item.area}
        <br />
        Reviews: {item.total_reviews}
      </div>
    ))}
  </div>
)}
            </div>
        
          </div>
        </header>

        {/* 4-Column KPI Grid */}
        <div className="kpi-grid">
          <KpiCard
  icon="🏪"
  label="Total Restaurants"
  value={kpis.total_restaurants}
  trend="8.6%"
/>

<KpiCard
  icon="⭐"
  label="Average Rating"
  value={kpis.avg_rating}
  trend="4.2%"
/>

<KpiCard
  icon="💬"
  label="Total Reviews"
  value={kpis.total_reviews}
  trend="12.5%"
/>

<KpiCard
  icon="📍"
  label="Top Area"
  value={areas[0]?.area || "Loading..."}
  trend="4.0%"
/>
        </div>

        {/* Mid Row: Main Chart & Top Rated Sidecard */}
        <div className="mid-grid">
          <div className="glass-card main-chart-card">
            <div className="chart-header">
              <h3>Restaurant Performance by Area</h3>
              <div className="chart-filters">
  <button className="filter-btn active">
    Restaurant Analytics
  </button>
</div>
              <select
  className="area-select"
  value={selectedArea}
  onChange={(e) => setSelectedArea(e.target.value)}
>
  <option value="All">All Areas</option>

  {areas.map((area, index) => (
    <option key={index} value={area.area}>
      {area.area}
    </option>
  ))}
</select>
            </div>
            <div className="chart-container-wrapper">
              <AreaChart data={filteredAreas} />
            </div>
          </div>

          <div className="glass-card side-list-card">
            <div className="card-header-row">
              <h3>Top Rated Restaurants</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="restaurant-ranking-list">
  {filteredRestaurants
  .slice(0, 5)
  .map((restaurant, index) => (
  <div
  key={index}
  className="rank-item"
  onClick={
  () => {setSelectedRestaurant(restaurant)
    setShowPopup(true);
  }}
  style={{ cursor: "pointer" }}
>
    <div className="rank-number">
      {index === 0
        ? "🥇"
        : index === 1
        ? "🥈"
        : index === 2
        ? "🥉"
        : `#${index + 1}`}
    </div>

    <div className="rank-details">
      <h4>{restaurant.restaurant_name}</h4>
      <span>{restaurant.area}</span>
    </div>

    <div className="rank-metrics">
      <span className="star-rating">
        ⭐ {restaurant.google_rating}
      </span>

      <span className="review-count">
        ({restaurant.total_reviews} reviews)
      </span>
    </div>
  </div>
))}
</div>
            <button className="footer-action-link">View All Restaurants →</button>
          </div>
        </div>

        {/* Bottom Row: 3 Columns split */}
        <div className="bottom-three-grid">
         <div className="glass-card dynamic-bar-card">
  <h3>Most Reviewed Restaurants</h3>

  <ReviewChart reviews={topReviews} />
</div>

          {/* Col 2: Cuisine Distribution */}
<div className="glass-card cuisine-pie-card">
  <h3>Restaurant Information</h3>

  {selectedRestaurant ? (
    <>
      <p>🍽 {selectedRestaurant.restaurant_name}</p>
      <p>📍 {selectedRestaurant.area}</p>
      <p>⭐ {selectedRestaurant.google_rating}</p>
      <p>💬 {selectedRestaurant.total_reviews} Reviews</p>


      <p>🚚 Delivery: {selectedRestaurant.online_delivery}</p>
      <p>🥡 Takeaway: {selectedRestaurant.takeaway}</p>
      <p>📅 Advance Booking: {selectedRestaurant.table_booking}</p>
      <p>🅿 Parking: {selectedRestaurant.parking}</p>
      <p>🍜 Signature Dish: {selectedRestaurant.signature_dish}</p>
      <p>📞 Phone: {selectedRestaurant.phone}</p>
    </>
  ) : (
    <p>Select a restaurant to view details.</p>
  )}
</div>
          {/* Col 3: Map Container Mock */}
          <div className="glass-card map-visual-card">
            <div className="card-header-row">
              <h3>Restaurant Map</h3>
              <button className="small-action-btn">View Full Map</button>
            </div>
            <RestaurantMap restaurants={mapRestaurants} />
          </div>
        </div>
      {showPopup && selectedRestaurant && (
  <div
    className="popup-overlay"
    onClick={() => setShowPopup(false)}
  >
    <div
      className="popup-card"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{selectedRestaurant.restaurant_name}</h2>

      <p>📍 Area: {selectedRestaurant.area}</p>

      <p>
        ⭐ Rating: {selectedRestaurant.google_rating}
      </p>

      <p>
        💬 Reviews: {selectedRestaurant.total_reviews}
      </p>
    </div>
  </div>
)}
      </main>
    </div>
  );
}

export default Dashboard;