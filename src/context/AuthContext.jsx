import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authApi } from "../lib/authApi";
import { authStorage } from "../lib/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => authStorage.get());

  const isAuthenticated = Boolean(auth?.token);
  const savedStep = auth?.user?.savedStep ?? 0;

  const persist = useCallback((data) => {
    authStorage.set(data);
    setAuth(data);
  }, []);

  const setSession = useCallback(
    ({ token, refreshToken, user }) => {
      persist({ token, refreshToken, user });
    },
    [persist]
  );

  const updateUser = useCallback(
    (patch) => {
      const next = { ...auth, user: { ...auth?.user, ...patch } };
      persist(next);
    },
    [auth, persist]
  );

  const logout = useCallback(async () => {
    try {
      if (isAuthenticated) await authApi.logout();
    } catch {
      // ignore network/logout errors, clear local session regardless
    }
    authStorage.clear();
    setAuth(null);
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({ auth, isAuthenticated, savedStep, setSession, updateUser, logout }),
    [auth, isAuthenticated, savedStep, setSession, updateUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
