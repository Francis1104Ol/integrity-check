import DashboardLayout from "../../layouts/DashboardLayout";

import PageHeader from "../../components/ui/PageHeader";

import DatasetTable from "../../components/datasets/DatasetTable";

export default function Datasets() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Datasets"
        subtitle="Manage uploaded datasets."
      />

      <DatasetTable />

    </DashboardLayout>
  );
}