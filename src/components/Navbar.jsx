import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/images/TrackEd-Logo.svg"; 

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-12 w-40 rounded-lg flex items-center justify-center px-2.5 ml-[-30px]">
                <img src={logo} />
            </div>
          </Link>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-white hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-200"
            >
              Login
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
