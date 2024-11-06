import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

export const Barchart = async () => {
  const [chartdata, setChartdata] = useState({ datasets: [], labels: [] });
  const [chartoption, setChartoption] = useState({});

  const fetchChartData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/record?user_id=${userId}`
      );
      console.log(res);

      // Extract labels and data
      const Cost = res.data.map((dataObj) => parseInt(dataObj.Cost, 10));
      const No = res.data.map((dataObj) => parseInt(dataObj.StartD, 10));

      // Update chart data state
      setChartdata({
        labels: No,
        datasets: [
          {
            label: "Daily Cost",
            data: Cost,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
      setChartoption({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Income - Expense" },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) =>
                value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                }),
            },
          },
        },
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);

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
      <Bar data={chartdata} options={chartoption} />
    </div>
  );
};
