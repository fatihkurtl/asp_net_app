import { Routes, Route } from "react-router-dom";

import HomePage from "../pages";
import AddPlacePage from "../pages/add_place";
import EditPlacePage from "../pages/edit_place";
import Login from "../pages/auth/login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add/place" element={<AddPlacePage />} />
      <Route path="/edit/place/:id" element={<EditPlacePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
