import { useMemo, useState } from "react";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

import { useDataset } from "../../../hooks/useDataset";

export default function DuplicateRecords({
  report,
  datasetId,
}) {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("ALL");

  const [selectedRow, setSelectedRow] = useState(null);
  const [loadingRow, setLoadingRow] = useState(false);

  const { getRow } = useDataset();

  const duplicateRecords = useMemo(() => {
    const errors = report?.errors || [];
    const warnings = report?.warnings || [];

    return [...errors, ...warnings].filter(
      (issue) => issue.type === "DUPLICATE"
    );
  }, [report]);

  const filteredRecords = useMemo(() => {
    return duplicateRecords.filter((record) => {
      const matchesSearch =
        !search ||
        String(record.value ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        String(record.row ?? "").includes(search);

      const matchesField =
        fieldFilter === "ALL" ||
        record.field === fieldFilter;

      return matchesSearch && matchesField;
    });
  }, [
    duplicateRecords,
    search,
    fieldFilter,
  ]);

  const fields = [
    ...new Set(
      duplicateRecords.map(
        (record) => record.field
      )
    ),
  ];

  async function handleViewRow(rowNumber) {
    try {
      setLoadingRow(true);

      const row = await getRow(
        datasetId,
        rowNumber
      );

      setSelectedRow(row);
    } catch (error) {
      console.error(
        "Failed to load dataset row:",
        error
      );
    } finally {
      setLoadingRow(false);
    }
  }

  if (!report) {
    return (
      <Card>
        <h2 className="text-lg font-semibold">
          Duplicate Records
        </h2>

        <p className="mt-4 text-slate-500">
          No validation report available.
        </p>
      </Card>
    );
  }

  return (
    <>
      <Card>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Duplicate Records
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Records identified as duplicates
              during validation.
            </p>
          </div>

          <Badge color="red">
            {duplicateRecords.length} found
          </Badge>
        </div>

        {/* Filters */}
        <div className="mb-6 grid gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search row or duplicate value..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={fieldFilter}
            onChange={(event) =>
              setFieldFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="ALL">
              All fields
            </option>

            {fields.map((field) => (
              <option
                key={field}
                value={field}
              >
                {field}
              </option>
            ))}
          </select>
        </div>

        {/* Empty state */}
        {filteredRecords.length === 0 ? (
          <div className="rounded-xl bg-slate-50 py-10 text-center">
            <p className="text-slate-500">
              No duplicate records found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500">
                  <th className="px-3 py-3">
                    Row
                  </th>

                  <th className="px-3 py-3">
                    Field
                  </th>

                  <th className="px-3 py-3">
                    Duplicate Value
                  </th>

                  <th className="px-3 py-3">
                    First Found
                  </th>

                  <th className="px-3 py-3">
                    Severity
                  </th>

                  <th className="px-3 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map(
                  (record, index) => {
                    const firstFound =
                      record.message?.match(
                        /row (\d+)/
                      )?.[1];

                    return (
                      <tr
                        key={`${record.row}-${record.field}-${index}`}
                        className="border-b transition hover:bg-slate-50"
                      >
                        <td className="px-3 py-4 font-medium">
                          {record.row}
                        </td>

                        <td className="px-3 py-4">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-sm">
                            {record.field}
                          </span>
                        </td>

                        <td className="px-3 py-4 font-mono text-sm">
                          {record.value || "—"}
                        </td>

                        <td className="px-3 py-4">
                          {firstFound
                            ? `Row ${firstFound}`
                            : "—"}
                        </td>

                        <td className="px-3 py-4">
                          <Badge
                            color={
                              record.severity ===
                              "WARNING"
                                ? "yellow"
                                : "red"
                            }
                          >
                            {record.severity ||
                              "ERROR"}
                          </Badge>
                        </td>

                        <td className="px-3 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewRow(
                                record.row
                              )
                            }
                            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={loadingRow}
                          >
                            {loadingRow
                              ? "Loading..."
                              : "View Row"}
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Row Viewer Modal */}
      {selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Dataset Row
                </h2>

                <p className="text-sm text-slate-500">
                  Row {selectedRow.rowNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRow(null)
                }
                className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            {/* Row Data */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <div className="overflow-hidden rounded-xl border">
                {Object.entries(
                  selectedRow.data || {}
                ).map(([field, value]) => (
                  <div
                    key={field}
                    className="grid grid-cols-1 border-b last:border-b-0 md:grid-cols-3"
                  >
                    <div className="bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
                      {field}
                    </div>

                    <div className="px-4 py-3 text-sm text-slate-900 md:col-span-2">
                      {String(value || "—")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setSelectedRow(null)
                }
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}