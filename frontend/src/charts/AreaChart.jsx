import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

function AreaChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.area),
    datasets: [
      {
        label: "Restaurants",
        data: data.map((item) => item.restaurant_count),
        fill: true,
        borderColor: "#7eff55",
        backgroundColor: "rgba(126,255,85,0.15)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "#7eff55",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#8b96a7",
        },
        grid: {
          color: "rgba(255,255,255,0.03)",
        },
      },
      y: {
        ticks: {
          color: "#8b96a7",
        },
        grid: {
          color: "rgba(255,255,255,0.03)",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default AreaChart;