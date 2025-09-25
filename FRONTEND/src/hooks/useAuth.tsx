import { useState, useEffect } from "react";

interface AuthReturn {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  googleLogin: () => Promise<boolean>;
}

export function useAuth(): AuthReturn {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Al iniciar, revisamos si ya había sesión guardada
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

    const googleLogin = async() => {
        try {
      const res = await fetch(import.meta.env.VITE_BACKURL + "/user/auth/google/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  }
  // Login
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(import.meta.env.VITE_BACKURL + "/user/iniciarsesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, contraseña: password }),
      });

      const data = await res.json();

      if (data.success && data.token) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.id);
        
        setToken(data.token);
        setUser(username);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    setToken(null);
    setUser(null);
  };



  return { user, token, login, logout, googleLogin };
}
