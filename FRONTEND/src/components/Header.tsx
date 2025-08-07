export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}