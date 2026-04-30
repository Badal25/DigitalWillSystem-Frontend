// // src/components/Dashboard/Charts/FraudChart.jsx
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend);

// const FraudChart = ({ data }) => {
//   const chartData = {
//     labels: ["Fraud Wills", "Safe Wills"],
//     datasets: [
//       {
//         data: [data.total_fraud || 0, data.total_wills - (data.total_fraud || 0)],
//         backgroundColor: ["#EF4444", "#6366F1"],
//         hoverOffset: 6,
//       },
//     ],
//   };

//   return (
//     <div className="p-4 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-slate-800">
//       <h3 className="text-lg font-bold mb-2">Fraud Distribution</h3>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// export default FraudChart;


import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const FraudChart = ({ data }) => {
  const totalFraud = parseInt(data.total_fraud) || 0;
  const totalWills = parseInt(data.total_wills) || 0;

  const chartData = {
    labels: ["Fraud Wills", "Safe Wills"],
    datasets: [
      {
        data: [totalFraud, totalWills - totalFraud],
        backgroundColor: ["#EF4444", "#6366F1"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="p-4 bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-slate-800">
      <h3 className="text-lg font-bold mb-2">Fraud Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default FraudChart;