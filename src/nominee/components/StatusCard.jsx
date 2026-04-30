export default function StatusCard({ status }) {
  let color = "gray";
  let text = "Unknown";

  switch (status) {
    case "pending":
      color = "yellow";
      text = "Waiting for document upload";
      break;
    case "under_review":
      color = "blue";
      text = "Documents under review by admin";
      break;
    case "approved":
      color = "purple";
      text = "Approved, waiting for release";
      break;
    case "released":
      color = "green";
      text = "Assets released! You can access below";
      break;
    case "invalid":
      color = "red";
      text = "Invalid or expired link";
      break;
  }

  return (
    <div className={`p-4 mb-6 border-l-4 border-${color}-500 bg-${color}-100`}>
      <p className="text-lg font-semibold">{text}</p>
    </div>
  );
}