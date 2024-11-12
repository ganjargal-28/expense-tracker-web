import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const chartDefaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Income - Expense" },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) =>
          value.toLocaleString("MNT", { style: "currency", currency: "MNT" }),
      },
    },
  },
};

export const Barchart = () => {
  const [chartData, setChartData] = useState({ datasets: [], labels: [] });
  const [chartOption, setChartOption] = useState(chartDefaultOptions);

  const fetchChartData = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.log("No userId found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/record`, {
        params: { user_id: userId, CAL: "month" },
      });
      const data = response.data;
      console.log(response);

      if (!Array.isArray(data)) {
        console.log("Unexpected data format:", data);
        return;
      }

      const Cost = data.map((entry) => parseInt(entry.Cost, 10));
      const Dates = data.map((entry) => entry.StartD);

      setChartData({
        labels: Dates,
        datasets: [
          {
            label: "Daily Cost",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  console.log("chartData", chartData);

  return (
    <div
      style={{
        width: "100%",
        background: "white",
        height: "100%",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Bar data={chartData} options={chartOption} />
    </div>
  );
};
