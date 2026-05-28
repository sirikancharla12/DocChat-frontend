import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadSection from "../components/UploadSection";
import QuerySection from "../components/QuerySection";
import { clearSession, getCurrentUser } from "../utils/auth";

export default function Home() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    clearSession();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f0f0f5] font-mono flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
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
              Choose a PDF, ask anything, get instant answers
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="text-xs text-[#a7a7b2]">Signed in as</div>
            <div className="rounded-md border border-[#2a2a32] bg-[#101014] px-3 py-2 text-sm text-[#f0f0f5]">
              {user?.name || user?.email || "User"}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-[#2a2a32] bg-[#e8ff47] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0b] transition hover:bg-[#d2dc1d]"
            >
              Logout
            </button>
          </div>
        </div>

        <UploadSection
          file={file}
          setFile={setFile}
        />

        <div className="h-px bg-[#2a2a32] my-7" />

        <QuerySection
          file={file}
        />

      </div>
    </div>
  );
}
