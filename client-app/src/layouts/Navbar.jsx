import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiServices from "../services/api";
import { logout } from "../features/auth/authSlice";

const NavbarLayout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await ApiServices.adminLogout();
      if (response.status === 200) {
        dispatch(logout());
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Ziyaretlerim
        </Link>
        <ul className="flex space-x-6">
          {token && (
            <>
              <li>
                <Link
                  to="/"
                  className={`text-white hover:text-gray-300 transition-colors duration-300 ${
                    location.pathname === "/" ? "underline" : ""
                  }`}
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  to="/add/place"
                  className={`text-white hover:text-gray-300 transition-colors duration-300 ${
                    location.pathname === "/add/place" ? "underline" : ""
                  }`}
                >
                  Yer Ekle
                </Link>
              </li>
            </>
          )}
          {!token ? (
            <li>
              <Link
                to="/login"
                className={`text-white hover:text-gray-300 transition-colors duration-300 ${
                  location.pathname === "/login" ? "underline" : ""
                }`}
              >
                Giriş Yap
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition-colors duration-300"
              >
                Çıkış Yap
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLayout;
