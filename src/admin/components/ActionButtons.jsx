import { CheckCircle, ShieldCheck, Send, XCircle } from "lucide-react";

export default function ActionButtons({ id, status, onAction }) {

  return (

    <div className="flex gap-2">

      {/* VERIFY */}

      <button
        onClick={() => onAction("verify", id)}
        disabled={status !== "pending"}
        className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm
        ${status === "pending"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        <CheckCircle size={16} />
        Verify
      </button>


      {/* APPROVE */}

      <button
        onClick={() => onAction("approve", id)}
        disabled={status !== "verified"}
        className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm
        ${status === "verified"
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        <ShieldCheck size={16} />
        Approve
      </button>


      {/* RELEASE */}

      <button
        onClick={() => onAction("release", id)}
        disabled={status !== "approved"}
        className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm
        ${status === "approved"
          ? "bg-purple-500 hover:bg-purple-600"
          : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        <Send size={16} />
        Release
      </button>


      {/* REJECT */}

      <button
        onClick={() => onAction("reject", id)}
        className="flex items-center gap-1 px-3 py-1 rounded text-white text-sm bg-red-500 hover:bg-red-600"
      >
        <XCircle size={16} />
        Reject
      </button>

    </div>

  );

}