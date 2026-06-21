import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function CuisineChart({ cuisines = [] }) {
  const data = {
    labels: cuisines.map(
      (item) => item.cuisine_type
    ),

    datasets: [
      {
        data: cuisines.map(
          (item) => item.restaurant_count
        ),

        backgroundColor: [
          "#7eff55",
          "#22c55e",
          "#0ea5e9",
          "#8b5cf6",
          "#f59e0b",
        ],
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default CuisineChart;