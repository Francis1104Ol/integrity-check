import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import DeleteDatasetModal from "./DeleteDatasetModal";
import DatasetActions from "./DatasetActions";
import { useDataset } from "../../hooks/useDataset";

export default function DatasetTable() {
  const {
    datasets,
    pagination,
    loading,
    fetchDatasets,
    remove,
    download,
    exportPdf,
    exportCsv,
    exportExcel,
  } = useDataset();

  const navigate = useNavigate();

  const [selectedDataset, setSelectedDataset] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const limit = 10;

  const statusColors = {
    COMPLETED: "green",
    FAILED: "red",
    PROCESSING: "yellow",
    UPLOADED: "blue",
  };

  function getStatusColor(datasetStatus) {
    return (
      statusColors[datasetStatus] || "blue"
    );
  }

  /*
   * Fetch datasets whenever
   * search, status or page changes.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDatasets({
        page,
        limit,
        ...(search.trim()
          ? { search: search.trim() }
          : {}),
        ...(status
          ? { status }
          : {}),
        sort: "createdAt",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [
    search,
    status,
    page,
    fetchDatasets,
  ]);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleStatusChange(event) {
    setStatus(event.target.value);
    setPage(1);
  }

  async function handleDownload(id) {
    try {
      const response = await download(id);

      const blob = new Blob(
        [response.data],
        {
          type:
            response.headers[
              "content-type"
            ] || "application/octet-stream",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "dataset";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success(
        "Dataset downloaded successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to download dataset."
      );
    }
  }

  async function handleExport(
    exportFunction,
    id,
    filename
  ) {
    try {
      const response =
        await exportFunction(id);

      const blob = new Blob(
        [response.data],
        {
          type:
            response.headers[
              "content-type"
            ] || "application/octet-stream",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success(
        "Report exported successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to export report."
      );
    }
  }

  async function handleDelete() {
    if (!selectedDataset) return;

    try {
      await remove(selectedDataset._id);

      setShowDeleteModal(false);
      setSelectedDataset(null);
    } catch {
      // Error already handled by useDataset.
    }
  }

  function getPageNumbers() {
    if (!pagination) return [];

    const totalPages =
      pagination.totalPages || 1;

    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  return (
    <Card>
      {/* Header / Filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            All Datasets
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse and manage uploaded datasets.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search datasets..."
            className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Status */}
          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              All statuses
            </option>

            <option value="UPLOADED">
              Uploaded
            </option>

            <option value="PROCESSING">
              Processing
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="FAILED">
              Failed
            </option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading datasets...
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500">
                  <th className="px-3 py-3">
                    Dataset
                  </th>

                  <th className="px-3 py-3">
                    Status
                  </th>

                  <th className="px-3 py-3 text-center">
                    Records
                  </th>

                  <th className="px-3 py-3 text-center">
                    Duplicates
                  </th>

                  <th className="px-3 py-3">
                    Uploaded By
                  </th>

                  <th className="px-3 py-3">
                    Date
                  </th>

                  <th className="px-3 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {datasets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center"
                    >
                      <p className="font-medium text-slate-600">
                        No datasets found.
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Try changing your search or
                        status filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  datasets.map((dataset) => (
                    <tr
                      key={dataset._id}
                      className="border-b transition hover:bg-slate-50"
                    >
                      {/* Dataset */}
                      <td className="px-3 py-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {dataset.name}
                          </p>

                          {dataset.originalFileName && (
                            <p className="mt-1 text-xs text-slate-400">
                              {
                                dataset.originalFileName
                              }
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-4">
                        <Badge
                          color={getStatusColor(
                            dataset.status
                          )}
                        >
                          {dataset.status ||
                            "UNKNOWN"}
                        </Badge>
                      </td>

                      {/* Records */}
                      <td className="px-3 py-4 text-center">
                        {dataset.totalRecords ?? 0}
                      </td>

                      {/* Duplicates */}
                      <td className="px-3 py-4 text-center">
                        {dataset.duplicateRecords ??
                          0}
                      </td>

                      {/* Uploaded By */}
                      <td className="px-3 py-4">
                        {dataset.uploadedBy ? (
                          <div>
                            <p className="font-medium">
                              {
                                dataset
                                  .uploadedBy
                                  .firstName
                              }{" "}
                              {
                                dataset
                                  .uploadedBy
                                  .lastName
                              }
                            </p>

                            <p className="text-xs text-slate-400">
                              {
                                dataset
                                  .uploadedBy
                                  .email
                              }
                            </p>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-3 py-4 text-sm">
                        {dataset.createdAt
                          ? new Date(
                              dataset.createdAt
                            ).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-4 text-center">
                        <DatasetActions
                          onView={() =>
                            navigate(
                              `/datasets/${dataset._id}`
                            )
                          }
                          onDownload={() =>
                            handleDownload(
                              dataset._id
                            )
                          }
                          onExportPdf={() =>
                            handleExport(
                              exportPdf,
                              dataset._id,
                              `${dataset.name}-report.pdf`
                            )
                          }
                          onExportCsv={() =>
                            handleExport(
                              exportCsv,
                              dataset._id,
                              `${dataset.name}-report.csv`
                            )
                          }
                          onExportExcel={() =>
                            handleExport(
                              exportExcel,
                              dataset._id,
                              `${dataset.name}-report.xlsx`
                            )
                          }
                          onDelete={() => {
                            setSelectedDataset(
                              dataset
                            );

                            setShowDeleteModal(
                              true
                            );
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination &&
            pagination.totalPages > 1 && (
              <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Page{" "}
                  <span className="font-medium text-slate-700">
                    {pagination.currentPage ||
                      page}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-700">
                    {pagination.totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(
                          current - 1,
                          1
                        )
                      )
                    }
                    className="rounded-lg border px-3 py-2 text-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {getPageNumbers().map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() =>
                          setPage(pageNumber)
                        }
                        className={`rounded-lg px-3 py-2 text-sm transition ${
                          pageNumber === page
                            ? "bg-blue-600 text-white"
                            : "border hover:bg-slate-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    disabled={
                      page >=
                      pagination.totalPages
                    }
                    onClick={() =>
                      setPage((current) =>
                        Math.min(
                          current + 1,
                          pagination.totalPages
                        )
                      )
                    }
                    className="rounded-lg border px-3 py-2 text-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
        </>
      )}

      {/* Delete Modal */}
      <DeleteDatasetModal
        open={showDeleteModal}
        dataset={selectedDataset}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedDataset(null);
        }}
        onConfirm={handleDelete}
      />
    </Card>
  );
}