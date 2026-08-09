import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteDatasetModal({
  open,
  dataset,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      title="Delete Dataset"
      onClose={onClose}
    >
      <p className="mb-6 text-slate-600">
        Are you sure you want to delete
        <strong>
          {" "}
          {dataset?.name}
        </strong>
        ?
      </p>

      <div className="flex justify-end gap-4">
        <Button
          onClick={onClose}
          className="bg-slate-300 text-black hover:bg-slate-400"
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}