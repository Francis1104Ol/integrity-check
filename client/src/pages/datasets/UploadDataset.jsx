import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import UploadForm from "../../components/datasets/UploadForm";

export default function UploadDataset() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Upload Dataset"
        subtitle="Upload Excel or CSV files for duplicate detection."
      />

      <Card className="max-w-3xl mx-auto">
        <UploadForm />
      </Card>
    </DashboardLayout>
  );
}