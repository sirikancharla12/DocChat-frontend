import { useState } from "react";

const EyeOpen = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function AuthPages() {
  const [page, setPage] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateLogin = () => {
    const e = {};
    if (!loginForm.email || !/\S+@\S+\.\S+/.test(loginForm.email)) e.email = "VALID EMAIL REQUIRED";
    if (!loginForm.password) e.password = "PASSWORD REQUIRED";
    return e;
  };

  const validateSignup = () => {
    const e = {};
    if (!signupForm.name.trim()) e.name = "NAME REQUIRED";
    if (!signupForm.email || !/\S+@\S+\.\S+/.test(signupForm.email)) e.email = "VALID EMAIL REQUIRED";
    if (!signupForm.password || signupForm.password.length < 6) e.password = "MIN 6 CHARACTERS";
    if (signupForm.password !== signupForm.confirm) e.confirm = "PASSWORDS DO NOT MATCH";
    return e;
  };

  const handleSubmit = () => {
    const errs = page === "login" ? validateLogin() : validateSignup();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(page === "login" ? "SIGNED IN SUCCESSFULLY" : "ACCOUNT CREATED");
    }, 1400);
  };

  const switchPage = (p) => {
    setPage(p);
    setErrors({});
    setShowPw(false);
    setShowConfirm(false);
  };

  const pwStrength = (pw) => {
    if (!pw) return 0;
    if (pw.length >= 10 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) return 3;
    if (pw.length >= 8) return 2;
    return 1;
  };

  const strengthColor = (s) => s === 3 ? "#CBFF00" : s === 2 ? "#f59e0b" : "#ff4545";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Barlow+Condensed:wght@700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, #root { background: #0d0d0d; min-height: 100vh; font-family: 'Space Mono', monospace; }
        .font-display { font-family: 'Barlow Condensed', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .fade-up  { animation: fadeUp   0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .slide-down { animation: slideDown 0.3s ease both; }

        .auth-input {
          width: 100%;
          background: #141414;
          border: 0.5px solid #252525;
          border-radius: 6px;
          padding: 13px 16px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: #e8e8e8;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          letter-spacing: 0.02em;
        }
        .auth-input::placeholder { color: #333; }
        .auth-input:focus {
          border-color: #CBFF00;
          box-shadow: 0 0 0 3px rgba(203,255,0,0.07);
        }
        .auth-input.err { border-color: #ff4545 !important; }

        .primary-btn {
          width: 100%;
          background: #CBFF00;
          color: #0d0d0d;
          border: none;
          border-radius: 6px;
          padding: 14px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.1s, box-shadow 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(203,255,0,0.22);
        }
        .primary-btn:active { transform: scale(0.98); box-shadow: none; }
        .primary-btn:disabled {
          background: #1e1e1e;
          color: #444;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .spinner {
          width: 13px; height: 13px;
          border: 2px solid #555;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 10px 0 12px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
          margin-bottom: -1px;
        }
        .tab-btn.active { color: #CBFF00; border-bottom-color: #CBFF00; }
        .tab-btn.inactive { color: #333; }
        .tab-btn.inactive:hover { color: #555; }

        .eye-btn {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #444; cursor: pointer;
          display: flex; align-items: center;
          transition: color 0.15s;
        }
        .eye-btn:hover { color: #CBFF00; }
      `}</style>

      {/* Page wrapper */}
      <div style={{ background: "#0d0d0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>

        {/* Toast */}
        {toast && (
          <div className="slide-down" style={{
            position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
            background: "#141414",
            border: `0.5px solid ${toast.type === "success" ? "#CBFF00" : "#ff4545"}`,
            borderLeft: `3px solid ${toast.type === "success" ? "#CBFF00" : "#ff4545"}`,
            borderRadius: 6, padding: "10px 20px",
            fontSize: 11, letterSpacing: "0.1em", color: "#e8e8e8",
            zIndex: 999, fontFamily: "Space Mono, monospace",
          }}>
            {toast.msg}
          </div>
        )}

        <div className="fade-up" style={{ width: "100%", maxWidth: 400 }}>

          {/* ── LOGO ── */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 26, height: 1.5, background: "#CBFF00" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "#CBFF00", fontFamily: "Space Mono, monospace" }}>
                AI-POWERED
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: 60, fontWeight: 900, lineHeight: 1, letterSpacing: "-1px", color: "#e8e8e8" }}>
              Doc<span style={{ color: "#CBFF00" }}>.</span>Chat
            </h1>
            <p style={{ fontSize: 12, color: "#3a3a3a", marginTop: 10, letterSpacing: "0.04em", fontFamily: "Space Mono, monospace" }}>
              Upload a PDF · Ask anything · Get instant answers
            </p>
          </div>

          {/* ── CARD ── */}
          <div style={{ background: "#0f0f0f", border: "0.5px solid #1e1e1e", borderRadius: 10, padding: "32px 28px", position: "relative", overflow: "hidden" }}>

            {/* Accent top bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#CBFF00" }} />

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "0.5px solid #1e1e1e", marginBottom: 28 }}>
              <button className={`tab-btn ${page === "login" ? "active" : "inactive"}`} onClick={() => switchPage("login")}>SIGN IN</button>
              <button className={`tab-btn ${page === "signup" ? "active" : "inactive"}`} onClick={() => switchPage("signup")}>CREATE ACCOUNT</button>
            </div>

            {/* ── LOGIN ── */}
            {page === "login" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "#CBFF00", fontFamily: "Space Mono, monospace" }}>01 — CREDENTIALS</span>
                  <div style={{ flex: 1, height: 0.5, background: "#1e1e1e" }} />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", color: "#555", marginBottom: 7, fontFamily: "Space Mono, monospace" }}>EMAIL ADDRESS</label>
                  <input
                    className={`auth-input${errors.email ? " err" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                  {errors.email && <p style={{ fontSize: 10, color: "#ff4545", letterSpacing: "0.06em", marginTop: 5, fontFamily: "Space Mono, monospace" }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", color: "#555", marginBottom: 7, fontFamily: "Space Mono, monospace" }}>PASSWORD</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className={`auth-input${errors.password ? " err" : ""}`}
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginForm.password}
                      style={{ paddingRight: 44 }}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <button className="eye-btn" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff /> : <EyeOpen />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: 10, color: "#ff4545", letterSpacing: "0.06em", marginTop: 5, fontFamily: "Space Mono, monospace" }}>{errors.password}</p>}
                </div>

                <button className="primary-btn" disabled={loading} onClick={handleSubmit}>
                  {loading ? <><span className="spinner" /> SIGNING IN…</> : "SIGN IN →"}
                </button>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#333", letterSpacing: "0.04em", fontFamily: "Space Mono, monospace" }}>
                  No account?{" "}
                  <span onClick={() => switchPage("signup")} style={{ color: "#CBFF00", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
                    Create one
                  </span>
                </p>
              </div>
            )}

            {/* ── SIGNUP ── */}
            {page === "signup" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "#CBFF00", fontFamily: "Space Mono, monospace" }}>01 — YOUR DETAILS</span>
                  <div style={{ flex: 1, height: 0.5, background: "#1e1e1e" }} />
                </div>

                {/* Name */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", color: "#555", marginBottom: 7, fontFamily: "Space Mono, monospace" }}>FULL NAME</label>
                  <input
                    className={`auth-input${errors.name ? " err" : ""}`}
                    type="text"
                    placeholder="Jane Smith"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  />
                  {errors.name && <p style={{ fontSize: 10, color: "#ff4545", letterSpacing: "0.06em", marginTop: 5, fontFamily: "Space Mono, monospace" }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", color: "#555", marginBottom: 7, fontFamily: "Space Mono, monospace" }}>EMAIL ADDRESS</label>
                  <input
                    className={`auth-input${errors.email ? " err" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  />
                  {errors.email && <p style={{ fontSize: 10, color: "#ff4545", letterSpacing: "0.06em", marginTop: 5, fontFamily: "Space Mono, monospace" }}>{errors.email}</p>}
                </div>

                {/* Password */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", color: "#555", marginBottom: 7, fontFamily: "Space Mono, monospace" }}>PASSWORD</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className={`auth-input${errors.password ? " err" : ""}`}
                      type={showPw ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={signupForm.password}
                      style={{ paddingRight: 44 }}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    />
                    <button className="eye-btn" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff /> : <EyeOpen />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: 10, color: "#ff4545", letterSpacing: "0.06em", marginTop: 5, fontFamily: "Space Mono, monospace" }}>{errors.password}</p>}
                  {/* Strength bar */}
                  {signupForm.password && (() => {
                    const s = pwStrength(signupForm.password);
                    return (
                      <div style={{ marginTop: 8, display: "flex", gap: 4 }}>
                        {[1, 2, 3].map((n) => (
                          <div key={n} style={{ flex: 1, height: 2, borderRadius: 2, background: n <= s ? strengthColor(s) : "#222", transition: "background 0.3s" }} />
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Confirm */}
                <div style={{ marginBottom: 26 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.12em", color: "#555", marginBottom: 7, fontFamily: "Space Mono, monospace" }}>CONFIRM PASSWORD</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className={`auth-input${errors.confirm ? " err" : ""}`}
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={signupForm.confirm}
                      style={{ paddingRight: 44 }}
                      onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <button className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <EyeOff /> : <EyeOpen />}
                    </button>
                  </div>
                  {errors.confirm && <p style={{ fontSize: 10, color: "#ff4545", letterSpacing: "0.06em", marginTop: 5, fontFamily: "Space Mono, monospace" }}>{errors.confirm}</p>}
                </div>

                <button className="primary-btn" disabled={loading} onClick={handleSubmit}>
                  {loading ? <><span className="spinner" /> CREATING ACCOUNT…</> : "CREATE ACCOUNT →"}
                </button>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#333", letterSpacing: "0.04em", fontFamily: "Space Mono, monospace" }}>
                  Already have one?{" "}
                  <span onClick={() => switchPage("login")} style={{ color: "#CBFF00", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>
                    Sign in
                  </span>
                </p>
              </div>
            )}
          </div>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 10, color: "#222", letterSpacing: "0.08em", fontFamily: "Space Mono, monospace" }}>
            © 2026 DOC.CHAT · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </>
  );
}