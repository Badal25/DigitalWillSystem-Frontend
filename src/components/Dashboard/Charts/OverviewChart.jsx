// // src/components/Dashboard/Charts/OverviewChart.jsx
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const OverviewChart = ({ data }) => {
//   const chartData = {
//     labels: data.last_7_days?.map(d => d.date) || [],
//     datasets: [
//       {
//         label: "New Wills",
//         data: data.last_7_days?.map(d => d.wills) || [],
//         borderColor: "rgba(99,102,241,1)",
//         backgroundColor: "rgba(99,102,241,0.3)",
//       },
//       {
//         label: "Fraud Flags",
//         data: data.last_7_days?.map(d => d.fraud) || [],
//         borderColor: "rgba(239,68,68,1)",
//         backgroundColor: "rgba(239,68,68,0.3)",
//       },
//     ],
//   };

//   return (
//     <div className="p-4 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-slate-800">
//       <h3 className="text-lg font-bold mb-2">Overview (Last 7 Days)</h3>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default OverviewChart;


// src/components/Dashboard/Charts/OverviewChart.jsx
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OverviewChart = ({ data }) => {
  const labels = data.last_7_days?.map(d => d.date) || [];
  const willsData = data.last_7_days?.map(d => parseInt(d.wills)) || [];
  const fraudData = data.last_7_days?.map(d => parseInt(d.fraud)) || [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "New Wills",
        data: willsData,
        borderColor: "rgba(99,102,241,1)",
        backgroundColor: "rgba(99,102,241,0.3)",
      },
      {
        label: "Fraud Flags",
        data: fraudData,
        borderColor: "rgba(239,68,68,1)",
        backgroundColor: "rgba(239,68,68,0.3)",
      },
    ],
  };

  return (
    <div className="p-4 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-slate-800">
      <h3 className="text-lg font-bold mb-2">Overview (Last 7 Days)</h3>
      <Line data={chartData} />
    </div>
  );
};

export default OverviewChart;