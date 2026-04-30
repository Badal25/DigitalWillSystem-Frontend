import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-slate-950/80 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          DigitalWill
        </h1>

        <div className="hidden md:flex gap-8 items-center">
          <Link to="/login" className="hover:text-primary">
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

