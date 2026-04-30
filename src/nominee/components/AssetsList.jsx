export default function AssetsList({ assets }) {
  if (!assets.length) return <p>No assets available yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Released Assets</h2>
      <ul className="space-y-2">
        {assets.map((a) => (
          <li key={a.id} className="border p-2 rounded flex justify-between">
            <span>{a.will_name} - {a.nominee_name}</span>
            <a
              href={`http://localhost:5000/uploads/wills/${a.pdf_file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}