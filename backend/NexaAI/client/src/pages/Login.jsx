import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Login() {
  const { login, register } = useAppContext();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setError(""); setBusy(true);
    try { if (mode === "register") await register(name, email, password); else await login(email, password); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return <main className="auth-page"><div className="auth-panel"><div className="auth-logo">N</div><p className="eyebrow">WELCOME TO NEXAAI</p><h1>{mode === "login" ? "Welcome back." : "Create your account."}</h1><p>{mode === "login" ? "Sign in to continue to your AI workspace." : "Create an account to save your conversations."}</p>
    <div className="auth-tabs"><button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button><button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Register</button></div>
    <form onSubmit={submit}>{mode === "register" && <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} /></label>}<label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Continue to NexaAI →" : "Create account →"}</button></form>
    <small className="auth-note">Backend authentication is enabled. Your password is never stored in plain text.</small>
  </div><div className="auth-visual"><div className="visual-glow"></div><div className="visual-card"><span>✦</span><h2>One workspace for your ideas.</h2><p>Chat, code, learn and explore with your own saved conversations.</p></div></div></main>;
}
export default Login;
