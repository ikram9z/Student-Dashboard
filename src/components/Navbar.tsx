import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, logoutUser } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, User, LogOut, List, PlusCircle, Home } from "lucide-react";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Student Dashboard
            </Link>

            {!isMobile && (
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/students"
                  className="px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Students
                </Link>
                {currentUser && (
                  <Link
                    to="/add-student"
                    className="px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
                  >
                    Add Student
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Desktop User Menu */}
          {!isMobile && (
            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-600 rounded-full p-1">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-sm">{currentUser.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white border-slate-600 hover:bg-slate-700 hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-white border-slate-600 hover:bg-slate-700 hover:text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <button
              type="button"
              className="p-2 rounded-md text-slate-200 hover:bg-slate-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/students"
            className="flex items-center gap-2 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <List className="h-5 w-5" />
            Students
          </Link>
          {currentUser && (
            <Link
              to="/add-student"
              className="flex items-center gap-2 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <PlusCircle className="h-5 w-5" />
              Add Student
            </Link>
          )}
          {currentUser ? (
            <div className="border-t border-slate-700 pt-2 mt-2">
              <div className="px-3 py-2 text-sm text-slate-300 flex items-center gap-2">
                <User className="h-4 w-4" />
                {currentUser.email}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 border-t border-slate-700 mt-2 pt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5" />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
