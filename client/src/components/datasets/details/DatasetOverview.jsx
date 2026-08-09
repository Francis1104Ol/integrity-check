import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function DatasetOverview({ dataset }) {
  function getStatusColor(status) {
    switch (status) {
      case "COMPLETED":
        return "green";

      case "FAILED":
        return "red";

      case "PROCESSING":
        return "yellow";

      default:
        return "blue";
    }
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Dataset Overview
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">
            Dataset Name
          </p>

          <p className="font-medium">
            {dataset.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Status
          </p>

          <Badge
            color={getStatusColor(dataset.status)}
          >
            {dataset.status}
          </Badge>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Uploaded By
          </p>

          <p>
            {dataset.uploadedBy?.firstName}{" "}
            {dataset.uploadedBy?.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Uploaded On
          </p>

          <p>
            {new Date(
              dataset.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
}