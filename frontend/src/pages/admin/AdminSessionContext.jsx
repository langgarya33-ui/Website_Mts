import { createContext, useContext, useEffect, useState } from "react";

const AdminSessionContext = createContext({
  admin: null,
  isLoading: true,
  refreshSession: async () => {},
  signOut: async () => {},
});

export function AdminSessionProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const response = await fetch("http://localhost:5000/api/admin/session", { credentials: "include" });
        const result = response.ok ? await response.json() : null;
        if (active) setAdmin(result?.authenticated ? result.admin : null);
      } catch {
        if (active) setAdmin(null);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  async function refreshSession() {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/session", { credentials: "include" });
      const result = response.ok ? await response.json() : null;
      setAdmin(result?.authenticated ? result.admin : null);
      return result?.authenticated ? result.admin : null;
    } catch {
      setAdmin(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    const response = await fetch("http://localhost:5000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || "Gagal keluar dari akun admin.");
    }
    setAdmin(null);
    return true;
  }

  return (
    <AdminSessionContext.Provider value={{ admin, isLoading, refreshSession, signOut }}>
      {children}
    </AdminSessionContext.Provider>
  );
}

// Context provider and hook stay together so consumers share one session context.
// eslint-disable-next-line react-refresh/only-export-components
export function useAdminSession() {
  return useContext(AdminSessionContext);
}
