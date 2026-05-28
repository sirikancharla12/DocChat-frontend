function Spinner() {
  return (
    <span
      className="w-3.5 h-3.5 rounded-full border-2 border-[#3a3a3a] border-t-[#0a0a0b] inline-block"
      style={{ animation: "spin 0.7s linear infinite" }}
    />
  );
}

export default Spinner;