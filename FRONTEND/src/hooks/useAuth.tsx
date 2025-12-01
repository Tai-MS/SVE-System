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
  const [token, settoken] = useState<string | null>(null);

  // Al iniciar, revisamos si ya había sesión guardada
  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");
    if (storedtoken && storedUser) {
      settoken(storedtoken);
      setUser(storedUser);
    }
  }, []);

  const googleLogin = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKURL + "/public/google",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      
      const data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.nombre);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("rol", data.rol);
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.nombre);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("rol", data.rol);
        settoken(data.token);
        setUser(data.nombre);
        // localStorage.setItem("token", data.token);
        // console.log(data);
        // setUser(data.nombre)
        // settoken(data.token);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  };
  // Login
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      
      const res = await fetch(
        import.meta.env.VITE_BACKURL + "/public/iniciarSesion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, contraseña: password }),
        }
      );

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("rol", data.rol);
        settoken(data.token);
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
    localStorage.removeItem("rol");

    settoken(null);
    setUser(null);
  };

  return { user, token, login, logout, googleLogin };
}
