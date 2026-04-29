import { useState, useRef, useCallback } from "react";
import axios from "axios";
export default function App() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const fileInputRef = useRef(null);

  const formatBytes = (b) => {
    if (b < 1024) return b + " B";
    if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
    return (b / 1048576).toFixed(1) + " MB";
  };

  const handleFile = (f) => {
    if (!f || f.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    setFile(f);
    setUploadMessage("");
    setAnswer("");
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const uploadFile = async () => {
  if (!file) {
    alert("Please select a PDF file first.");
    return;
  }

const API = process.env.BASE_URL || "http://localhost:5000";


  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${API}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUploadMessage(
      res.data.message || "Document ready!"
    );

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.error || "Upload failed");
  } finally {
    setUploading(false);
  }
};

 const askQuestion = async () => {
  if (!question.trim()) return;

  if (!uploadMessage) {
    alert("Upload a document first!");
    return;
  }

  try {
    setAsking(true);
    setAnswer("");

    const res = await axios.post(`${API}/ask`, {
      query: question,
    });

    setAnswer(res.data.answer);

  } catch (err) {
    console.error(err);
    setAnswer(
      err.response?.data?.error ||
      "Failed to get answer. Is backend running?"
    );
  } finally {
    setAsking(false);
  }
};

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };


  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f0f0f5] font-mono flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl flex flex-col gap-0">

        {/* HEADER */}
        <div className="mb-10 animate-[fadeUp_0.5s_ease_both]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b7e] mb-2 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-[#e8ff47]" />
            AI-Powered
          </p>
          <h1
            className="text-5xl font-black leading-none tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Doc<span className="text-[#e8ff47]">.</span>Chat
          </h1>
          <p className="mt-2 text-xs text-[#6b6b7e] tracking-wide">
            Upload a PDF · Ask anything · Get instant answers
          </p>
        </div>

        {/* SECTION 01 */}
        <div className="animate-[fadeUp_0.5s_0.1s_ease_both]">
          <SectionLabel number="01" label="Document" />

          {/* DROP ZONE */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => !file && fileInputRef.current?.click()}
            className={`
              relative border border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer
              transition-all duration-200 overflow-hidden
              ${dragging
                ? "border-[#e8ff47] bg-[#18181d] shadow-[0_0_0_1px_#e8ff47,0_0_30px_rgba(232,255,71,0.08)] scale-[1.005]"
                : "border-[#2a2a32] bg-[#111114] hover:border-[#e8ff47] hover:bg-[#18181d]"
              }
            `}
          >
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,255,71,0.05)_0%,transparent_70%)]
                ${dragging ? "opacity-100" : "opacity-0"}`}
            />

            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200
                ${dragging
                  ? "border-[#e8ff47] bg-[rgba(232,255,71,0.06)]"
                  : "border-[#2a2a32] bg-[#18181d]"
                }`}
            >
              <UploadIcon
                className={`w-5 h-5 transition-colors duration-200 ${dragging ? "stroke-[#e8ff47]" : "stroke-[#6b6b7e]"}`}
              />
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-[#f0f0f5] mb-1">Drop your PDF here</p>
              <p className="text-xs text-[#6b6b7e]">
                or{" "}
                <button
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="text-[#e8ff47] underline underline-offset-2 cursor-pointer"
                >
                  browse files
                </button>
                {" "}· Max 50MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            />
          </div>

          {file && (
            <div className="flex items-center gap-3 mt-3 px-4 py-3 bg-[#18181d] border border-[#2a2a32] rounded-xl animate-[fadeUp_0.3s_ease_both]">
              <div className="w-9 h-9 rounded-lg bg-[rgba(232,255,71,0.08)] flex items-center justify-center flex-shrink-0">
                <FileIcon className="w-4 h-4 stroke-[#e8ff47]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#f0f0f5] truncate">{file.name}</p>
                <p className="text-[10px] text-[#6b6b7e] mt-0.5">{formatBytes(file.size)}</p>
              </div>
              <button
                onClick={() => { setFile(null); setUploadMessage(""); }}
                className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-[rgba(255,71,87,0.12)] group"
              >
                <XIcon className="w-3.5 h-3.5 stroke-[#6b6b7e] group-hover:stroke-[#ff4757] transition-colors" />
              </button>
            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={uploading || !file}
            className={`
              w-full mt-3 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200
              ${uploading || !file
                ? "bg-[#18181d] text-[#6b6b7e] border border-[#2a2a32] cursor-not-allowed"
                : "bg-[#e8ff47] text-[#0a0a0b] hover:opacity-90 active:scale-[0.99]"
              }
            `}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner /> Uploading…
              </span>
            ) : (
              "Upload PDF"
            )}
          </button>

          {uploadMessage && (
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-[rgba(71,255,138,0.08)] border border-[rgba(71,255,138,0.2)] text-[#47ff8a] text-[11px] animate-[fadeUp_0.3s_ease_both]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#47ff8a] animate-pulse" />
              {uploadMessage}
            </div>
          )}
        </div>

        <div className="h-px bg-[#2a2a32] my-7 animate-[fadeUp_0.5s_0.2s_ease_both]" />

        {/* SECTION 02 */}
        <div className="animate-[fadeUp_0.5s_0.3s_ease_both]">
          <SectionLabel number="02" label="Query" />

          <div className="flex gap-2.5 items-end">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your document…"
              rows={1}
              className="flex-1 bg-[#111114] border border-[#2a2a32] rounded-xl px-4 py-3.5 text-xs text-[#f0f0f5] placeholder-[#6b6b7e] outline-none resize-none h-[52px] leading-relaxed transition-all duration-200 focus:border-[#47d9ff] focus:shadow-[0_0_0_3px_rgba(71,217,255,0.07)] font-mono"
            />
            <button
              onClick={askQuestion}
              disabled={asking || !question.trim() || !uploadMessage}
              className={`
                w-[52px] h-[52px] flex-shrink-0 rounded-xl border flex items-center justify-center transition-all duration-200
                ${asking || !question.trim()
                  ? "bg-[#111114] border-[#2a2a32] text-[#6b6b7e] cursor-not-allowed opacity-40"
                  : "bg-[#18181d] border-[#2a2a32] text-[#6b6b7e] hover:border-[#47d9ff] hover:bg-[rgba(71,217,255,0.07)] hover:text-[#47d9ff] active:scale-95"
                }
              `}
            >
              <SendIcon className="w-4 h-4 stroke-current" />
            </button>
          </div>

          {(asking || answer) && (
            <div className="mt-5 bg-[#111114] border border-[#2a2a32] rounded-xl overflow-hidden animate-[fadeUp_0.35s_ease_both]">
              <div className="px-4 py-2.5 border-b border-[#2a2a32] bg-[#18181d] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#47d9ff] animate-pulse" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#6b6b7e]">Response</span>
              </div>
              <div className="px-4 py-4 text-xs leading-relaxed text-[#f0f0f5] whitespace-pre-wrap">
                {asking ? <ThinkingDots /> : answer}
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span className="text-[9px] tracking-[0.25em] uppercase text-[#6b6b7e]">
        {number} — {label}
      </span>
      <span className="flex-1 h-px bg-[#2a2a32]" />
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex gap-1.5 items-center py-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-[#6b6b7e]"
          style={{ animation: `bounce 1.2s ease ${delay}ms infinite` }}
        />
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="w-3.5 h-3.5 rounded-full border-2 border-[#3a3a3a] border-t-[#0a0a0b] inline-block"
      style={{ animation: "spin 0.7s linear infinite" }}
    />
  );
}


function UploadIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}