import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RestaurantMap({ restaurants }) {
  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={11}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restaurants.map((restaurant, index) => (
        <Marker
          key={index}
          position={[
            restaurant.latitude,
            restaurant.longitude,
          ]}
        >
          <Popup>
            <strong>{restaurant.restaurant_name}</strong>
            <br />
            ⭐ {restaurant.google_rating}
            <br />
            {restaurant.area}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default RestaurantMap;