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

export default ThinkingDots;