import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ReviewChart({ reviews = [] }) {
  const data = {
    labels: reviews.map(
      (item) => item.restaurant_name
    ),

    datasets: [
      {
        label: "Reviews",
        data: reviews.map(
          (item) => item.total_reviews
        ),
        backgroundColor: "#7eff55",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: "250px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ReviewChart;