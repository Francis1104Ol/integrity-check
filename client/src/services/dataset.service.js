import api from "./api";

export const DatasetService = {
  upload(formData) {
    return api.post(
      "/datasets/upload",
      formData
    );
  },

  getAll(params = {}) {
    return api.get("/datasets", {
      params,
    });
  },

  getById(id) {
    return api.get(`/datasets/${id}`);
  },

  getSummary(id) {
    return api.get(
      `/datasets/${id}/summary`
    );
  },

  getRow(id, rowNumber) {
    return api.get(
      `/datasets/${id}/rows/${rowNumber}`
    );
  },

  delete(id) {
    return api.delete(
      `/datasets/${id}`
    );
  },

  download(id) {
    return api.get(
      `/datasets/${id}/file`,
      {
        responseType: "blob",
      }
    );
  },

  exportPdf(id) {
    return api.get(
      `/datasets/${id}/export/pdf`,
      {
        responseType: "blob",
      }
    );
  },

  exportCsv(id) {
    return api.get(
      `/datasets/${id}/export/csv`,
      {
        responseType: "blob",
      }
    );
  },

  exportExcel(id) {
    return api.get(
      `/datasets/${id}/export/excel`,
      {
        responseType: "blob",
      }
    );
  },
};