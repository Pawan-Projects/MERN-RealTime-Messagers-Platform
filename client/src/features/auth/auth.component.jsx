import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth.hook";

export default function AuthComponent() {
  const navigate = useNavigate();
  const { login, register, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(form);
        navigate("/chat");
      } else {
        await register(form);
        setIsLogin(true);
        alert("Registered! Please login.");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0f14] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">Pulse</span>
        </div>

        {/* card */}
        <div className="bg-[#111318] border border-white/5 rounded-2xl p-6 shadow-xl">

          {/* heading */}
          <h2 className="text-white font-semibold text-lg mb-1">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-white/30 text-xs mb-6">
            {isLogin ? "Sign in to continue to Pulse" : "Join Pulse and start chatting"}
          </p>

          {/* fields */}
          <div className="flex flex-col gap-3">
            {!isLogin && (
              <div>
                <label className="text-white/40 text-xs mb-1.5 block">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/8 text-white text-sm rounded-xl px-4 py-2.5 outline-none placeholder-white/20 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition"
                />
              </div>
            )}

            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/8 text-white text-sm rounded-xl px-4 py-2.5 outline-none placeholder-white/20 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition"
              />
            </div>

            <div>
              <label className="text-white/40 text-xs mb-1.5 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-white/5 border border-white/8 text-white text-sm rounded-xl px-4 py-2.5 outline-none placeholder-white/20 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition"
              />
            </div>
          </div>

          {/* submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-2.5 transition-all active:scale-95 shadow-lg shadow-indigo-900/40"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Please wait…
              </span>
            ) : isLogin ? "Sign in" : "Create account"}
          </button>

          {/* toggle */}
          <p className="mt-4 text-center text-xs text-white/30">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}