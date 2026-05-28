import { useState } from "react";
import { uploadPDF, askQuestionAPI } from "../api/api";

export default function useDocChat() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Select PDF first");

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadPDF(formData);
      setUploadMessage(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    if (!uploadMessage) return alert("Upload first");

    try {
      setAsking(true);
      const res = await askQuestionAPI(question);
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Error getting answer");
    } finally {
      setAsking(false);
    }
  };

  return {
    file, setFile,
    uploadMessage, uploading, uploadFile,
    question, setQuestion,
    answer, asking, askQuestion
  };
}