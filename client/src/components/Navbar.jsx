import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">CollegeHub</Link>

      <div className="flex gap-6 items-center">
        {userInfo ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/compare">Compare</Link>
            <Link to="/saved">Saved</Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;