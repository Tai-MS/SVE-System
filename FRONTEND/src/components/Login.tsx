import { useState } from "react";
import Header from "./Header";
interface LoginProps {
    setUser: (username: string) => void;
}


const users = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' }
]

function Login({ setUser }: LoginProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setError(true);
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }
    

    const user = users.find(
      (u) => u.username === username && u.password === password
    );
     if (user) {
        setError(false);
        setUser(username)
    } else {
        setError(true);
        setErrorMessage("Nombre de usuario o contraseña incorrectos.");
    }

    setUsername("");
    setPassword("");
    };

  return (
    <>
    <Header />
        <div className="mb-4 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm">
                <form 
                    className="flex flex-col text-black mx-2" 
                    action="" onSubmit={handleSubmit} 
                >
                    <label className="flex mb-2">E-mail o Usuario</label>
                    <input
                        className="mb-4"
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={username}
                        onChange={(x) => setUsername(x.target.value)}
                        name="username"
                    />
                    <label className="flex mb-2">Contraseña</label>
                    <input
                        className="mb-2"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(x) => setPassword(x.target.value)}
                        name="password"
                    />
                    <div className="flex text-rose-700 min-h-6">
                        {error && <p > {errorMessage} </p>}
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
                    >
                        Iniciar Sesión con Google
                    </button>
                </form>
            </div>
        </div>
    </>
  )

}

export default Login;