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

export default SectionLabel;