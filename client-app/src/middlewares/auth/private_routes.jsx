import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [token, navigate, location]);

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
