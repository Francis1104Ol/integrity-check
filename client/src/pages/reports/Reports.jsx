import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { useDataset } from "../../hooks/useDataset";

export default function Reports() {
  const navigate = useNavigate();

  const {
    datasets = [],
    loading,
  } = useDataset();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const statusColors = {
    PASSED: "green",
    FAILED: "red",
    PENDING: "yellow",
  };

  const filteredReports = useMemo(() => {
    return datasets.filter((dataset) => {
      const reportStatus =
        dataset.report?.summary?.status ||
        "PENDING";

      const matchesSearch =
        dataset.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        dataset.originalFileName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        reportStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [datasets, search, statusFilter]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Validation Reports"
        subtitle="Review validation results and data quality reports."
      />

      <Card className="mt-6">
        {/* Header / Filters */}
        <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              All Reports
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the validation results for uploaded datasets.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search reports..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                All statuses
              </option>

              <option value="PASSED">
                Passed
              </option>

              <option value="FAILED">
                Failed
              </option>

              <option value="PENDING">
                Pending
              </option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-12 text-center text-slate-500">
            Loading reports...
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            No validation reports found.
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[900px]">
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
                    Errors
                  </th>

                  <th className="px-3 py-3 text-center">
                    Warnings
                  </th>

                  <th className="px-3 py-3 text-center">
                    Health Score
                  </th>

                  <th className="px-3 py-3">
                    Date
                  </th>

                  <th className="px-3 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((dataset) => {
                  const report =
                    dataset.report;

                  const summary =
                    report?.summary || {};

                  const statistics =
                    report?.statistics || {};

                  const status =
                    summary.status ||
                    "PENDING";

                  return (
                    <tr
                      key={dataset._id}
                      className="border-b transition hover:bg-slate-50"
                    >
                      {/* Dataset */}
                      <td className="px-3 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {dataset.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {
                              dataset.originalFileName
                            }
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-4">
                        <Badge
                          color={
                            statusColors[
                              status
                            ] || "blue"
                          }
                        >
                          {status}
                        </Badge>
                      </td>

                      {/* Records */}
                      <td className="px-3 py-4 text-center">
                        {summary.totalRecords ??
                          statistics.totalRecords ??
                          dataset.totalRecords ??
                          0}
                      </td>

                      {/* Errors */}
                      <td className="px-3 py-4 text-center">
                        <span
                          className={
                            (statistics.totalErrors ??
                              report?.errors
                                ?.length ??
                              0) > 0
                              ? "font-semibold text-red-600"
                              : "text-slate-600"
                          }
                        >
                          {statistics.totalErrors ??
                            report?.errors
                              ?.length ??
                            0}
                        </span>
                      </td>

                      {/* Warnings */}
                      <td className="px-3 py-4 text-center">
                        <span
                          className={
                            (statistics.totalWarnings ??
                              report?.warnings
                                ?.length ??
                              0) > 0
                              ? "font-semibold text-yellow-600"
                              : "text-slate-600"
                          }
                        >
                          {statistics.totalWarnings ??
                            report?.warnings
                              ?.length ??
                            0}
                        </span>
                      </td>

                      {/* Health Score */}
                      <td className="px-3 py-4 text-center">
                        <span
                          className={`font-semibold ${
                            (summary.healthScore ??
                              0) >= 80
                              ? "text-green-600"
                              : (summary.healthScore ??
                                    0) >= 50
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {summary.healthScore ??
                            0}
                          %
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-3 py-4 text-sm text-slate-600">
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
                          : "-"}
                      </td>

                      {/* Action */}
                      <td className="px-3 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/datasets/${dataset._id}`
                            )
                          }
                          className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                          title="View Report"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}