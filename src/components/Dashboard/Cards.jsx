// src/components/Dashboard/Cards.jsx
import { FileText, Users, Shield, Bot, AlertCircle } from "lucide-react";

const Cards = ({ data }) => {
  const stats = [
    {
      title: "Total Wills",
      value: data.total_wills || 0,
      icon: <FileText size={24} />,
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "NomineeManagement",
      value: data.total_nominee || 0,
      icon: <Users size={24} />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Insurance Policies",
      value: data.total_insurance || 0,
      icon: <Shield size={24} />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "AI Messages",
      value: data.total_ai_chats || 0,
      icon: <Bot size={24} />,
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Fraud Flags",
      value: data.total_fraud || 0,
      icon: <AlertCircle size={24} />,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`p-4 rounded-2xl bg-slate-900/50 backdrop-blur-lg border border-slate-800 flex flex-col items-start hover:shadow-xl transition`}
        >
          <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white mb-3`}>
            {stat.icon}
          </div>
          <h3 className="text-2xl font-bold">{stat.value}</h3>
          <p className="text-slate-400 text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
