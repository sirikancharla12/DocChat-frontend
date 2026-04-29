import axios from "axios";

const API = "http://localhost:5000";

export const uploadPDF = (formData) =>
  axios.post(`${API}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const askQuestionAPI = (query) =>
  axios.post(`${API}/ask`, { query });