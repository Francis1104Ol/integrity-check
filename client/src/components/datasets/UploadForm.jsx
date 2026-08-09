import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

import UploadZone from "./UploadZone";

import { useDataset } from "../../hooks/useDataset";
import toast from "react-hot-toast";
export default function UploadForm() {
  const navigate = useNavigate();

  const { upload, loading } = useDataset();

  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
  if (!file) {
    toast.error("Please select a file.");
    return;
  }

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append(
    "description",
    data.description
  );
  formData.append("file", file);

  try {
    await upload(formData);

    navigate("/datasets");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <UploadZone
        file={file}
        setFile={setFile}
      />

      <Input
        label="Dataset Name"
        placeholder="July Farmers Dataset"
        error={errors.name?.message}
        {...register("name", {
          required: "Dataset name is required",
        })}
      />

      <Textarea
        label="Description"
        placeholder="Optional description"
        {...register("description")}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Uploading..."
          : "Upload Dataset"}
      </Button>
    </form>
  );
}