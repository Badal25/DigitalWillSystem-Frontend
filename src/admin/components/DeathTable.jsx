import { Eye } from "lucide-react";
import ActionButtons from "./ActionButtons";

export default function DeathTable({
  data = [],
  loading = false,
  onVerify,
  onApprove,
  onRelease,
  onReject
}) {

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Loading cases...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">No cases found</p>
      </div>
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "verified":
        return "bg-blue-100 text-blue-700";

      case "approved":
        return "bg-green-100 text-green-700";

      case "released":
        return "bg-purple-100 text-purple-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-600 text-left">

          <tr>
            <th className="p-3">ID</th>
            <th>Email</th>
            <th>Will ID</th>
            <th>Status</th>
            <th>Fraud</th>
            <th>Document</th>
            <th>Actions</th>
          </tr>

        </thead>


        {/* BODY */}
        <tbody>

          {data.map((caseItem) => (

            <tr
              key={caseItem.id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="p-3 font-medium">{caseItem.id}</td>

              <td>{caseItem.email}</td>

              <td>{caseItem.will_id}</td>


              {/* STATUS */}
              <td>

                <span
                  className={`px-2 py-1 text-xs rounded ${statusColor(caseItem.status)}`}
                >
                  {caseItem.status}
                </span>

              </td>


              {/* FRAUD FLAG */}
              <td>

                {caseItem.fraud_flag ? (
                  <span className="text-red-600 font-semibold">
                    ⚠ Fraud
                  </span>
                ) : (
                  <span className="text-green-600">
                    Safe
                  </span>
                )}

              </td>


              {/* DOCUMENT VIEW */}
              <td>

                {caseItem.verification_document ? (

                  <a
                    href={`http://localhost:5000/uploads/${caseItem.verification_document}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Eye size={16} />
                    View
                  </a>

                ) : (

                  <span className="text-gray-400">
                    No Document
                  </span>

                )}

              </td>


              {/* ACTION BUTTONS */}
              <td>

                <ActionButtons
                  status={caseItem.status}
                  id={caseItem.id}
                  onVerify={onVerify}
                  onApprove={onApprove}
                  onRelease={onRelease}
                  onReject={onReject}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}