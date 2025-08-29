
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { logout } from "../api";
import useIsLoggedIn from "../hooks/useIsLoggedin";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = useIsLoggedIn();  // <-- এখানে
  // console.log(isLoggedIn);

  function handleLogout() {
    logout();

    // Trigger auth status change event
    window.dispatchEvent(new Event('auth-status-changed'));
    navigate("/login");
  }

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Brand */}
          <div className="flex-shrink-0 text-lg font-bold">
            <Link to="/">MyApp</Link>
          </div>

          {/* Right side - Nav Links */}
          <div className="flex space-x-4 items-center">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
            >
              Home
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  Profile
                </Link>
                <Link
                  to="/secret"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  Secret
                </Link>
                <Link
                  to="/payment"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  Payment
                </Link>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-200"
                >
                  Login
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <span className="px-3 py-2 text-sm text-indigo-100">
                  Welcome!
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
