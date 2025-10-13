import { Grid3X3, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-400 px-6 py-4 bottom-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        {/* Grid icon on the left */}
        <div className="flex items-center">
          <Grid3X3 size={20} className="text-gray-600" />
        </div>

        {/* Social media icons on the right */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.instagram.com/terciariourquiza49/"
            target="_blank"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/school/terciario-urquiza/"
            target="_blank"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
