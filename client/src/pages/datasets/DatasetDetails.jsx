import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";

import { useDataset } from "../../hooks/useDataset";

import DatasetOverview from "../../components/datasets/details/DatasetOverview";
import DatasetStatistics from "../../components/datasets/details/DatasetStatistics";
import ValidationSummary from "../../components/datasets/details/ValidationSummary";
import DuplicateRecords from "../../components/datasets/details/DuplicateRecords";
import DatasetExports from "../../components/datasets/details/DatasetExports";

import downloadFile from "../../utils/downloadFile";

export default function DatasetDetails() {
  const { id } = useParams();

  const {
    getById,
    download,
    exportPdf,
    exportCsv,
    exportExcel,
  } = useDataset();

  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDataset() {
      try {
        const data = await getById(id);
        console.log("DATASET FROM API:", data);
console.log(
  "REPORT SUMMARY:",
  JSON.stringify(data.report?.summary, null, 2)
);

console.log(
  "REPORT STATISTICS:",
  JSON.stringify(data.report?.statistics, null, 2)
);
console.log(
  "VALIDATION ERRORS:",
  JSON.stringify(dataset?.report?.errors, null, 2)
);

console.log(
  "VALIDATION WARNINGS:",
  dataset?.report?.warnings
);
        setDataset(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDataset();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-10 text-center text-slate-500">
          Loading dataset...
        </div>
      </DashboardLayout>
    );
  }

  if (!dataset) {
    return (
      <DashboardLayout>
        <div className="py-10 text-center text-red-500">
          Dataset not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title={dataset.name}
        subtitle="Dataset Details"
      />

      <div className="space-y-8">
        {/* Overview */}
        <DatasetOverview
          dataset={dataset}
        />

        {/* Statistics */}
        <DatasetStatistics
          dataset={dataset}
        />

        {/* Validation Summary + Exports */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ValidationSummary
            report={dataset.report}
          />

          <DatasetExports
            onDownload={async () => {
              const response =
                await download(dataset._id);

              downloadFile(
                response.data,
                dataset.originalFileName
              );
            }}
            onPdf={async () => {
              const response =
                await exportPdf(dataset._id);

              downloadFile(
                response.data,
                "validation-report.pdf"
              );
            }}
            onCsv={async () => {
              const response =
                await exportCsv(dataset._id);

              downloadFile(
                response.data,
                "validation-report.csv"
              );
            }}
            onExcel={async () => {
              const response =
                await exportExcel(dataset._id);

              downloadFile(
                response.data,
                "validation-report.xlsx"
              );
            }}
          />
        </div>

        {/* Duplicate Records */}
      <DuplicateRecords
  report={dataset.report}
  datasetId={dataset._id}
/>
      </div>
    </DashboardLayout>
  );
}