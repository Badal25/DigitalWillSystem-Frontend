import StatCard from "./StatCard";
import { ShieldAlert, FileCheck, CheckCircle, Send } from "lucide-react";

export default function DashboardCards({ stats }) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <StatCard
        title="Pending Cases"
        value={stats.pending}
        icon={<ShieldAlert size={22} />}
        color="bg-yellow-500"
      />

      <StatCard
        title="Verified"
        value={stats.verified}
        icon={<FileCheck size={22} />}
        color="bg-blue-500"
      />

      <StatCard
        title="Approved"
        value={stats.approved}
        icon={<CheckCircle size={22} />}
        color="bg-green-500"
      />

      <StatCard
        title="Released"
        value={stats.released}
        icon={<Send size={22} />}
        color="bg-purple-500"
      />

    </div>

  );

}
