import { useEffect, useState } from "react";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("https://food-iq-bengaluru-1.onrender.com/api/topreviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        background: "#03090f",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>Restaurant Reviews</h1>

      <div
        style={{
          marginTop: "20px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Restaurant</th>
              <th align="left">Area</th>
              <th align="left">Rating</th>
              <th align="left">Reviews</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((item, index) => (
              <tr key={index}>
                <td>{item.restaurant_name}</td>
                <td>{item.area}</td>
                <td>⭐ {item.google_rating}</td>
                <td>{item.total_reviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reviews;