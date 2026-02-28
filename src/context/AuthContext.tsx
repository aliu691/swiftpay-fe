import { createContext, useState, useEffect, ReactNode } from "react";
import { getProfile } from "../api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAdmin: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAdmin: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

/* ===========================
   TOKEN HELPERS
=========================== */

const getStoredToken = () => {
  const localToken = localStorage.getItem("token");
  if (localToken) return localToken;

  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return cookieToken || null;
};

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===========================
     BOOTSTRAP USER ON LOAD
  =========================== */

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (error) {
        // Token invalid
        localStorage.removeItem("token");
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  /* ===========================
     LOGIN
  =========================== */

  const login = (newToken: string) => {
    // Store in BOTH
    localStorage.setItem("token", newToken);
    document.cookie = `token=${newToken}; path=/; SameSite=Lax`;

    setToken(newToken);
    setLoading(true);
  };

  /* ===========================
     LOGOUT
  =========================== */

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    setToken(null);
    setUser(null);

    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: user?.role === "admin",
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
