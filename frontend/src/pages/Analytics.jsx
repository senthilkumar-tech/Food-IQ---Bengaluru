import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [areas, setAreas] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/areas")
      .then((res) => setAreas(res.data))
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/api/cuisines")
      .then((res) => setCuisines(res.data))
      .catch((err) => console.log(err));
  }, []);

  const areaChartData = {
    labels: areas.map((item) => item.area),
    datasets: [
      {
        label: "Restaurants",
        data: areas.map((item) => item.restaurant_count),
        backgroundColor: "rgba(126,255,85,0.8)",
        borderRadius: 8,
      },
    ],
  };

  const cuisineChartData = {
    labels: cuisines.map((item) => item.cuisine_type),
    datasets: [
      {
        data: cuisines.map((item) => item.restaurant_count),
        backgroundColor: [
          "#7eff55",
          "#22c55e",
          "#0ea5e9",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ],
      },
    ],
  };
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ffffff",
      },
      grid: {
        color: "rgba(255,255,255,0.05)",
      },
    },
    y: {
      ticks: {
        color: "#ffffff",
      },
      grid: {
        color: "rgba(255,255,255,0.05)",
      },
    },
  },
};
  return (
    <div
      style={{
        padding: "40px",
        background: "#03090f",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <h3>Area Performance</h3>
          <Bar data={areaChartData} options={chartOptions} />
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <h3>Cuisine Distribution</h3>
          <Doughnut
  data={cuisineChartData}
  options={{
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  }}
/>
        </div>
      </div>
    </div>
  );
}

export default Analytics;