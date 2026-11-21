import { useState } from "react";
import LogoMts from "../../assets/image/logo_mts.png";
import { validateLogin } from "./validateLogin";
import { useAdminSession } from "./AdminSessionContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { refreshSession } = useAdminSession();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const validationError = validateLogin(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Username atau password salah.");
        return;
      }

      await refreshSession();
      window.location.assign("/");
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center px-6 py-10 bg-fade-blue">
      <div className="w-full flex flex-col items-center">
        <img src={LogoMts} alt="Logo MTs An-Nur" className="w-40 h-30 object-contain" />
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <h1 className="font-bold text-2xl">MTs AN-NUR KLAPANUNGGAL</h1>
          <h2 className="font-semibold text-black/40">Selamat Datang Kembali Admin MTs An-Nur Klapanunggal</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 flex flex-col items-center" noValidate>
        <label htmlFor="username" className="sr-only">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          value={form.username}
          onChange={(event) => setForm({ ...form, username: event.target.value })}
          className="w-full bg-transparent h-14 px-2 border-b border-gray-400 outline-none"
        />
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          className="w-full bg-transparent h-14 px-2 mt-4 border-b border-gray-400 outline-none"
        />

        {error && <p role="alert" className="w-full mt-4 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 bg-primary text-white font-bold w-70 h-10 rounded-xl cursor-pointer transition-all duration-200 ease-in-out hover:brightness-110 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0.5 active:brightness-90 active:shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "MEMERIKSA..." : "LOGIN"}
        </button>
      </form>
    </main>
  );
}
