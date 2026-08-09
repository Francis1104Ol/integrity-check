import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import DeleteDatasetModal from "./DeleteDatasetModal";
import { useDataset } from "../../hooks/useDataset";
import DatasetActions from "./DatasetActions";
export default function DatasetTable() {
  const {
  datasets,
  loading,
  remove,
} = useDataset();

  const navigate = useNavigate();
  
const [selectedDataset, setSelectedDataset] =
  useState(null);

const [showDeleteModal, setShowDeleteModal] =
  useState(false);
  const statusColors = {
  COMPLETED: "green",
  FAILED: "red",
  PROCESSING: "yellow",
  UPLOADED: "blue",
};

function getStatusColor(status) {
  return statusColors[status] || "blue";
}

  if (loading) {
    return (
      <Card>
        <div className="py-10 text-center text-slate-500">
          Loading datasets...
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Dataset</th>

            <th>Status</th>

            <th className="text-center">
              Records
            </th>

            <th className="text-center">
              Duplicates
            </th>

            <th>Uploaded By</th>

            <th>Date</th>

            <th className="text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {datasets.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-slate-500"
              >
                No datasets found.
              </td>
            </tr>
          ) : (
            datasets.map((dataset) => (
              <tr
                key={dataset._id}
                className="border-b transition hover:bg-slate-50"
              >
                <td className="py-4 font-medium">
                  {dataset.name}
                </td>

                <td>
                  <Badge
                    color={getStatusColor(
                      dataset.status
                    )}
                  >
                    {dataset.status}
                  </Badge>
                </td>

                <td className="text-center">
                  {dataset.totalRecords}
                </td>

                <td className="text-center">
                  {dataset.duplicateRecords}
                </td>

                <td>
                  {dataset.uploadedBy?.firstName}{" "}
                  {dataset.uploadedBy?.lastName}
                </td>

                <td>
                  {new Date(
                    dataset.createdAt
                  ).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </td>

                <td className="text-center">
                  <DatasetActions
                    onView={() =>
                      navigate(
                        `/datasets/${dataset._id}`
                      )
                    }
                    onDelete={() => {
  setSelectedDataset(dataset);
  setShowDeleteModal(true);
}}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <DeleteDatasetModal
  open={showDeleteModal}
  dataset={selectedDataset}
  onClose={() =>{
    setShowDeleteModal(false);
    setSelectedDataset(null);
  }}
  onConfirm={async () => {
  if (!selectedDataset) return;

  await remove(selectedDataset._id);

  setShowDeleteModal(false);
  setSelectedDataset(null);
}}
/>
    </Card>
  );
}