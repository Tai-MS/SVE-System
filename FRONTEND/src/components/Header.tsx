import { type JSX } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  user?: string | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps): JSX.Element {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 z-50 ">
      <div className="flex justify-between items-center px-10">
        <a href="https://terciariourquiza.edu.ar/" target="_blank">
          <img
            src="/logo.svg"
            alt="Logo terciario urquiza"
            className="h-16 object-contain"
          />
        </a>
        <div className="flex space-x-3 md:mt-2 gap-10 text-m text-gray-700">
          {/* <NavLink
            to="/materiales"
            className="hover:text-blue-400 cursor-pointer"
          >
            Materiales
          </NavLink>
          <NavLink to="/tareas" className="hover:text-blue-400 cursor-pointer">
            Tareas
          </NavLink> */}
          <NavLink
            to="/comunicados"
            className="hover:text-blue-400 cursor-pointer"
          >
            Comunicados
          </NavLink>
          {localStorage.getItem("rol") === "ADMINISTRADOR" || localStorage.getItem("rol") === "BEDELIA" || localStorage.getItem("rol") === "DIRECTIVO" && (
          <NavLink
            to="/usuarios"
            className="hover:text-blue-400 cursor-pointer"
          >
            Alumnos
          </NavLink>)}
          <NavLink
            to="/UC"
            className="hover:text-blue-400 cursor-pointer"
          >
            Carreras
          </NavLink>
          {user && onLogout && (
            <button
              onClick={onLogout}
              className="ml-4 bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
