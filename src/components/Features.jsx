import { Shield, FileText, Bot, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FileText size={28} />,
      title: "Smart Will Management",
      desc: "Version control and nominee verification.",
    },
    {
      icon: <Shield size={28} />,
      title: "Fraud Detection",
      desc: "Advanced monitoring system.",
    },
    {
      icon: <Bot size={28} />,
      title: "AI Legal Assistant",
      desc: "Integrated AI chat guidance.",
    },
    {
      icon: <Users size={28} />,
      title: "Nominee Secure Access",
      desc: "Token-based inheritance release.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-primary transition"
          >
            <div className="text-primary mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;