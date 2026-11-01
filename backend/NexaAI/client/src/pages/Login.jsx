import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Login() {
  const { login, register, resetPassword } = useAppContext();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "register") {
        await register(name.trim(), email.trim(), password);
      } else if (mode === "reset") {
        await resetPassword(email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const titles = {
    login: "Welcome back.",
    register: "Create your account.",
    reset: "Reset your password.",
  };

  const subtitles = {
    login: "Sign in to continue to your AI workspace.",
    register: "Create an account to save your conversations.",
    reset: "Enter your registered email and choose a new password.",
  };

  return (
    <main className="auth-page">
      <div className="auth-panel">
        <div className="auth-logo">N</div>
        <p className="eyebrow">WELCOME TO NEXAAI</p>
        <h1>{titles[mode]}</h1>
        <p>{subtitles[mode]}</p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => switchMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={submit}>
          {mode === "register" && (
            <label>
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label>
            {mode === "reset" ? "New password" : "Password"}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === "login" ? 1 : 8}
              placeholder={mode === "login" ? "••••••••" : "At least 8 characters"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </label>

          {mode === "login" && (
            <button
              type="button"
              className="auth-link"
              onClick={() => switchMode("reset")}
            >
              Forgot password?
            </button>
          )}

          {mode === "reset" && (
            <button
              type="button"
              className="auth-link"
              onClick={() => switchMode("login")}
            >
              ← Back to login
            </button>
          )}

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button" type="submit" disabled={busy}>
            {busy
              ? "Please wait…"
              : mode === "login"
              ? "Continue to NexaAI →"
              : mode === "register"
              ? "Create account →"
              : "Update Password & Sign In →"}
          </button>
        </form>

        <small className="auth-note">
          Backend authentication is enabled. Your password is never stored in plain text.
        </small>
      </div>

      <div className="auth-visual">
        <div className="visual-glow"></div>
        <div className="visual-card">
          <span>✦</span>
          <h2>One workspace for your ideas.</h2>
          <p>Chat, code, learn and explore with your own saved conversations.</p>
        </div>
      </div>
    </main>
  );
}

export default Login;
