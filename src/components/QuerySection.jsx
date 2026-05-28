import { useState } from "react";

import { askDocumentQuestionAPI } from "../api/api";
import SendIcon from "./ui/icons/SendIcon";
import ResponseBox from "./ResponseBox";
import SectionLabel from "./ui/SectionLabel";



export default function QuerySection({
  file,
}) {

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [asking, setAsking] = useState(false);

  const askQuestion = async () => {

    if (asking) return;
    if (!question.trim()) return;
    if (!file) {
      setAnswer("Choose a PDF before asking a question.");
      return;
    }

    try {

      setAsking(true);

      const res = await askDocumentQuestionAPI(file, question);

      setAnswer(res.data.answer);

    } catch (err) {

      setAnswer(
        err.response?.data?.error
      );

    } finally {

      setAsking(false);
    }
  };

  return (
    <div>

      <SectionLabel
        number="02"
        label="Query"
      />

      <div className="flex gap-3">

        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              askQuestion();
            }
          }}
          placeholder="Ask anything..."
          className="flex-1 bg-[#111114] border border-[#2a2a32] rounded-xl p-3"
        />

        <button
          type="button"
          disabled={!file || !question.trim() || asking}
          onClick={askQuestion}
          className="w-14 rounded-xl bg-[#18181d] flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >

          <SendIcon className="w-4 h-4 stroke-[#47d9ff]" />

        </button>

      </div>

      <ResponseBox
        asking={asking}
        answer={answer}
      />

    </div>
  );
}
