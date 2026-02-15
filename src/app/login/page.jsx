"use client";

import { useState } from "react";
import { useAuth } from "../Components/AuthProvider";
import { useRouter } from "next/navigation";
import MenuPage from "../Components/MenuPage";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();

  const [isFlipped, setIsFlipped] = useState(false); // false = login, true = register
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (regPassword !== regConfirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register(regUsername, regEmail, regPassword);
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b-2 border-amber-300/60 focus:border-amber-300 outline-none px-2 py-2 text-amber-100 placeholder-amber-300/40 transition-colors duration-300 text-sm";

  return (
    <main className="flex-1 flex-col content-around justify-items-center h-screen bg-[url(Assets/WebpageBackground.png)] bg-size-[100vw_100vh]">
      <MenuPage>
        {/* Flip container */}
        <div className="relative w-full h-full" style={{ perspective: "1200px" }}>
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* ─── FRONT SIDE: LOGIN ─── */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <h1 className="text-4xl text-amber-300 font-[Great_Vibes] mb-8 drop-shadow-lg">
                Welcome Back
              </h1>

              {error && !isFlipped && (
                <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
              )}

              <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-5">
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={inputClass}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={inputClass}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 border-2 border-amber-300 text-amber-300 py-2 rounded-sm font-[Great_Vibes] text-2xl hover:bg-amber-300/10 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "..." : "Sign In"}
                </button>
              </form>

              <p className="mt-8 text-amber-300/60 text-sm">
                No account?{" "}
                <button
                  onClick={() => { setIsFlipped(true); setError(""); }}
                  className="text-amber-300 underline underline-offset-4 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Register
                </button>
              </p>
            </div>

            {/* ─── BACK SIDE: REGISTER ─── */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-8"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <h1 className="text-4xl text-amber-300 font-[Great_Vibes] mb-8 drop-shadow-lg">
                Join Cravely
              </h1>

              {error && isFlipped && (
                <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
              )}

              <form onSubmit={handleRegister} className="w-full max-w-xs flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Username"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className={inputClass}
                  required
                  minLength={3}
                  maxLength={24}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className={inputClass}
                  required
                />
                <input
                  type="password"
                  placeholder="Password (min 6 chars)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className={inputClass}
                  required
                  minLength={6}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className={inputClass}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 border-2 border-amber-300 text-amber-300 py-2 rounded-sm font-[Great_Vibes] text-2xl hover:bg-amber-300/10 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "..." : "Register"}
                </button>
              </form>

              <p className="mt-8 text-amber-300/60 text-sm">
                Already a member?{" "}
                <button
                  onClick={() => { setIsFlipped(false); setError(""); }}
                  className="text-amber-300 underline underline-offset-4 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </MenuPage>
    </main>
  );
}
