import Card from "../../ui/Card";
import Button from "../../ui/Button";

export default function DatasetExports({
  onDownload,
  onPdf,
  onCsv,
  onExcel,
}) {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Export & Download
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Button
          onClick={onDownload}
          className="w-full"
        >
          Download Original
        </Button>

        <Button
          onClick={onPdf}
          className="w-full"
        >
          Export PDF
        </Button>

        <Button
          onClick={onCsv}
          className="w-full"
        >
          Export CSV
        </Button>

        <Button
          onClick={onExcel}
          className="w-full"
        >
          Export Excel
        </Button>
      </div>
    </Card>
  );
}