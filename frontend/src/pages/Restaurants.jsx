import { useEffect, useState } from "react";
import axios from "axios";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

useEffect(() => {
  axios
    .get("https://food-iq-bengaluru-1.onrender.com/api/restaurants")
    .then((res) => {
      console.log("API DATA:", res.data);
      setRestaurants(res.data);
    })
    .catch((err) => {
      console.error("API ERROR:", err);
    });
}, []);

  const filteredRestaurants =
    restaurants.filter((restaurant) =>
      restaurant.restaurant_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
        background: "#03090f",
        minHeight: "100vh",
      }}
    >
      <h1>Restaurants Directory</h1>

      <input
        type="text"
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "none",
        }}
      />
        <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    background: "rgba(255,255,255,0.03)",
    borderRadius: "12px",
    overflow: "hidden",
  }}
>
  <thead
  style={{
    background: "rgba(126,255,85,0.1)",
  }}
>
          <tr key={restaurants.restaurant_name}
          style={{
               borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
          >
            <th>Restaurant</th>
            <th>Area</th>
            <th>Rating</th>
            <th>Reviews</th>
            <th>Cuisine</th>
          </tr>
        </thead>

        <tbody>
          {filteredRestaurants.map((restaurant, index) => (
            <tr key={index}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
      >
              <td>{restaurant.restaurant_name}</td>
              <td>{restaurant.area}</td>
              <td>{restaurant.google_rating}</td>
              <td>{restaurant.total_reviews}</td>
              <td>{restaurant.cuisine_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Restaurants;