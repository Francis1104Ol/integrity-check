import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Datasets from "../pages/datasets/Datasets";
import DatasetDetails from "../pages/datasets/DatasetDetails";
import UploadDataset from "../pages/datasets/UploadDataset";
import Reports from "../pages/reports/Reports";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/NotFound";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <Navigate
            replace
            to="/login"
          />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />
      <Route
  path="/register"
  element={<Register />}
/>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/datasets"
          element={<Datasets />}
        />

        <Route
          path="/datasets/upload"
          element={<UploadDataset />}
        />

        <Route
          path="/datasets/:id"
          element={<DatasetDetails />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      {/* Catch-all */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}