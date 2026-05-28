import { useState, useRef, useCallback } from "react";

import SectionLabel from "./ui/SectionLabel";
import UploadIcon from "./ui/icons/uploadIcon";
import FileIcon from "./ui/icons/FileIcon";
import XIcon from "./ui/icons/XIIcon";
import formatBytes from "../utils/formatBytes.jsx";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

export default function UploadSection({ file, setFile }) {

  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f || f.type !== "application/pdf") {
      alert("Please select valid PDF");
      return;
    }

    if (f.size > MAX_UPLOAD_SIZE) {
      alert("PDF size must be 10 MB or less");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFile(f);
  }, [setFile]);

  const onDrop = useCallback((e) => {
    e.preventDefault();

    setDragging(false);

    const f = e.dataTransfer.files[0];

    if (f) handleFile(f);

  }, [handleFile]);

  return (
    <div>

      <SectionLabel
        number="01"
        label="Document"
      />

      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border border-dashed rounded-xl p-10 cursor-pointer
          ${dragging
            ? "border-[#e8ff47]"
            : "border-[#2a2a32]"
          }
        `}
      >

        <div className="flex flex-col items-center gap-3">

          <UploadIcon className="w-6 h-6 stroke-[#e8ff47]" />

          <p>{file ? "Change PDF" : "Drop PDF here"}</p>
          <p className="text-xs text-[#6b6b7e]">
            PDF only, up to 10 MB. 
          </p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={(e) =>
              handleFile(e.target.files[0])
            }
          />

        </div>
      </div>

      {file && (
        <div className="mt-3 flex items-center justify-between rounded-md border border-[#2a2a32] bg-[#18181d] p-3">

          <div className="flex items-center gap-3">

            <FileIcon className="w-4 h-4 stroke-[#e8ff47]" />

            <div>
              <p>{file.name}</p>
              <p className="text-xs text-gray-400">
                {formatBytes(file.size)}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => {
              setFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="rounded-md p-2 transition hover:bg-[#23232a]"
          >
            <XIcon className="w-4 h-4 stroke-red-500" />
          </button>

        </div>
      )}

    </div>
  );
}
