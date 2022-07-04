import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import MainPage from "./pages/MainPage";
import PlayerPage from "./pages/PlayerPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route
        path="/profile/:id"
        element={<ProtectedRoute component={ProfilePage} />}
      />
    </Routes>
  );
};

export default Router;