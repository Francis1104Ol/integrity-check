import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { DatasetService } from "../services/dataset.service";

export function useDataset() {
  const [datasets, setDatasets] = useState([]);
  const [pagination, setPagination] =
    useState(null);
  const [loading, setLoading] =
    useState(true);

  async function fetchDatasets(params = {}) {
    try {
      setLoading(true);

      const response =
        await DatasetService.getAll(params);

      const data =
        response.data.data;

      setDatasets(
        data?.datasets || []
      );

      setPagination(
        data?.pagination || null
      );

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load datasets."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDatasets();
  }, []);

  async function getAll(params = {}) {
    const response =
      await DatasetService.getAll(params);

    return response.data.data;
  }

  async function getById(id) {
    const response =
      await DatasetService.getById(id);

    return response.data.data;
  }

  async function getSummary(id) {
    const response =
      await DatasetService.getSummary(id);

    return response.data.data;
  }

  async function getRow(id, rowNumber) {
    const response =
      await DatasetService.getRow(
        id,
        rowNumber
      );

    return response.data.data;
  }

  async function upload(formData) {
    try {
      setLoading(true);

      const response =
        await DatasetService.upload(
          formData
        );

      toast.success(
        "Dataset uploaded successfully."
      );

      await fetchDatasets();

      return response.data.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload failed."
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id) {
    try {
      await DatasetService.delete(id);

      toast.success(
        "Dataset deleted successfully."
      );

      await fetchDatasets();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );

      throw error;
    }
  }

  async function download(id) {
    return DatasetService.download(id);
  }

  async function exportPdf(id) {
    return DatasetService.exportPdf(id);
  }

  async function exportCsv(id) {
    return DatasetService.exportCsv(id);
  }

  async function exportExcel(id) {
    return DatasetService.exportExcel(id);
  }

  return {
    datasets,
    pagination,
    loading,

    fetchDatasets,

    getAll,
    getById,
    getSummary,
    getRow,

    upload,
    remove,

    download,
    exportPdf,
    exportCsv,
    exportExcel,
  };
}