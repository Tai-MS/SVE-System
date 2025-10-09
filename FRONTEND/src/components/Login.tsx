import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      navigate("/comunicados"); // Redirigir al home
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <>
      <div id="login-body">
        <div className="h-full flex flex-col items-center justify-center space-y-5">
          <a
            href="https://terciariourquiza.edu.ar/"
            target="_blank"
            className="md:mt-5"
          >
            <img
              src="/logo.svg"
              alt="Logo terciario urquiza"
              className="object-contain h-30 w-30 mx-auto bg-white rounded-full"
            />
          </a>
          <h1 className="font-bold text-gray-white text-white text-shadow-md text-shadow-black ">
            Sistema Virtual Escolar
          </h1>
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm shadow-gray-800">
            <form
              className="flex flex-col text-black mx-2"
              onSubmit={handleSubmit}
            >
              <label className="flex mb-2">E-mail o Usuario:</label>
              <input
                className="mb-4"
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />

              <label className="flex mb-2">Contraseña:</label>
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
    </>
  );
}

export default Login;
