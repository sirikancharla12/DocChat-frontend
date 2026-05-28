import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { saveSession } from "../utils/auth";
import { API_BASE_URL } from "../utils/apiBase";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        form
      );

      saveSession(res.data.user, res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] px-4 py-12 text-[#f0f0f5] font-mono flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mb-10">
          <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#6b6b7e]">
            <span className="inline-block h-px w-4 bg-[#e8ff47]" />
            Start reading
          </p>

          <h1
            className="text-5xl font-black leading-none tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Doc<span className="text-[#e8ff47]">.</span>Chat
          </h1>

          <p className="mt-2 text-xs tracking-wide text-[#6b6b7e]">
            Create an account and turn your PDFs into searchable conversations.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-[#2a2a32] bg-[#101014] p-6 shadow-2xl shadow-black/30"
        >
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#6b6b7e]">
                Account
              </p>
              <h2 className="mt-1 text-2xl font-black">Signup</h2>
            </div>

            <Link
              to="/auth/login"
              className="rounded-md border border-[#2a2a32] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e8ff47] transition hover:border-[#e8ff47]"
            >
              Login
            </Link>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-400/40 bg-red-400/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <label className="mb-4 block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#a7a7b2]">
              Name
            </span>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-md border border-[#2a2a32] bg-[#0a0a0b] px-3 py-3 text-sm text-[#f0f0f5] outline-none transition placeholder:text-[#4f4f5f] focus:border-[#e8ff47]"
              required
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#a7a7b2]">
              Email
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-md border border-[#2a2a32] bg-[#0a0a0b] px-3 py-3 text-sm text-[#f0f0f5] outline-none transition placeholder:text-[#4f4f5f] focus:border-[#e8ff47]"
              required
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#a7a7b2]">
              Password
            </span>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full rounded-md border border-[#2a2a32] bg-[#0a0a0b] px-3 py-3 text-sm text-[#f0f0f5] outline-none transition placeholder:text-[#4f4f5f] focus:border-[#e8ff47]"
              minLength={6}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border border-[#e8ff47] bg-[#e8ff47] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0a0a0b] transition hover:bg-[#d2dc1d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
