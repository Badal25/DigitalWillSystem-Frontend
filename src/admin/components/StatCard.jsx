import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
  loading = false
}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex items-center justify-between"
    >

      {/* LEFT CONTENT */}
      <div>

        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>

        {loading ? (
          <div className="h-7 w-16 bg-gray-200 rounded mt-2 animate-pulse"></div>
        ) : (
          <h2 className="text-3xl font-bold text-gray-800 mt-1">
            {value}
          </h2>
        )}

      </div>


      {/* ICON BOX */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${color}`}
      >
        {icon}
      </div>

    </motion.div>
  );

}