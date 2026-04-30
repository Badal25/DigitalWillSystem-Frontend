// const Footer = () => {
//   return (
//     <footer className="py-8 text-center border-t border-slate-800 text-slate-500">
//       © 2026 DigitalWill. All rights reserved.
//     </footer>
//   );
// };

// export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-slate-800 bg-slate-950 text-slate-500 relative">
      
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Center Text */}
        <p className="text-center text-sm">
          © 2026 DigitalWill. All rights reserved.
        </p>

        {/* Right Side Admin */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <Link
            to="/admin/login"
            className="text-sm hover:text-purple-400 transition"
          >
            Admin
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;