import { Routes, Route } from "react-router-dom";

import HomePage from "../pages";
import AddPlacePage from "../pages/add_place";
import EditPlacePage from "../pages/edit_place";
import Login from "../pages/auth/login";
import ProtectedRoute from "../middlewares/auth/private_routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/add/place" element={<ProtectedRoute><AddPlacePage /></ProtectedRoute>} />
      <Route path="/edit/place/:id" element={<ProtectedRoute><EditPlacePage /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
