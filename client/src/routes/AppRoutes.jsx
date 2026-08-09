import UploadDataset from "../pages/datasets/UploadDataset";
import Datasets from "../pages/datasets/Datasets";
import DatasetDetails from "../pages/datasets/DatasetDetails";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
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
    </Routes>

    
  );
}