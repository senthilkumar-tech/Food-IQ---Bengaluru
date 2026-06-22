import axios from "axios";

const API = axios.create({
  baseURL: "https://food-iq-bengaluru-1.onrender.com/api",
});

export default API;