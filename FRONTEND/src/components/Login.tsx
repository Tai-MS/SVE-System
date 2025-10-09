import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LoginProps {
  login: (username: string, password: string) => Promise<boolean>;
}

function Login({ login }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await login(username, password);

    if (success) {
      navigate("/home"); // Redirigir al home
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <>
      <Header />
      <div id="login-body">
        <div className="h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm">
            <form
              className="flex flex-col text-black mx-2"
              onSubmit={handleSubmit}
            >
              <label className="flex mb-2">E-mail o Usuario</label>
              <input
                className="mb-4"
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />

              <label className="flex mb-2">Contraseña</label>
              <input
                className="mb-2"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />

              <div className="flex text-rose-700 min-h-6">
                {error && <p>{error}</p>}
              </div>

              <button
                className="mt-6 mb-4 bg-indigo-600 border-2 text-white py-2 px-4 rounded-2xl 
                          hover:border-indigo-800 transition-colors duration-300"
                type="submit"
              >
                Iniciar Sesión
              </button>

              <button
                className="mx-6 mt-4 bg-zinc-400 border-2 text-white py-2 px-4 rounded-2xl 
                          hover:border-indigo-800 transition-colors duration-300"
                type="button"
                onClick={async () => {
                  window.location.href =
                    import.meta.env.VITE_BACKURL + "/user/google";
                }}
              >
                Iniciar Sesión con Google
              </button>
            </form>
          </div>
        </div>
      </div>
      <div id="login-footer">
        <Footer />
      </div>
    </>
  );
}

export default Login;
