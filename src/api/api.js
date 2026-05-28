import axios from "axios";
import { API_BASE_URL } from "../utils/apiBase";

export const uploadPDF = (formData) =>
  axios.post(`${API_BASE_URL}/api/docs/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const askQuestionAPI = (query) =>
  axios.post(`${API_BASE_URL}/api/docs/ask`, { query });

export const askDocumentQuestionAPI = (file, query) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("query", query);

  return axios.post(`${API_BASE_URL}/api/docs/ask-with-document`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
