import ThinkingDots from "./ui/ThinkingDots";

export default function ResponseBox({
  asking,
  answer,
}) {

  if (!asking && !answer) return null;

  return (
    <div className="mt-5 bg-[#111114] border border-[#2a2a32] rounded-xl p-4">

      {asking ? (
        <ThinkingDots />
      ) : (
        answer
      )}

    </div>
  );
}