import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        CollegeHub
      </Link>

      <div className="flex gap-6">
        <Link to="/">Home</Link>

        <Link to="/compare">
          Compare
        </Link>

        <Link to="/saved">
          Saved
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;