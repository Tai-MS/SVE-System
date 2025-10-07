import {type JSX} from "react";

interface HeaderProps {
  user?: string | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps): JSX.Element {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 z-50 overflow-hidden">
      <div className="mx-6 flex justify-between items-center">
        <img
          src="/logo.svg"
          alt="Logo terciario urquiza"
          className="h-16 object-contain"
        />
        <nav>
          <ul className="flex gap-6 text-m text-gray-700">
            <li className="hover:text-blue-400 cursor-pointer">Inicio</li>
            <li className="hover:text-blue-400 cursor-pointer">Acerca</li>
            <li className="hover:text-blue-400 cursor-pointer">Contacto</li>
              {user && onLogout && (
            <button
              onClick={onLogout}
              className="ml-4 bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
            >
            Logout
            </button>)}
          </ul>
        </nav>

   
      </div>
    </header>
  );
}
