import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";

function Carreras() {
  const [selected, setSelected] = useState("Carreras");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen mt-4">
      {/* Sidebar */}
      <div className="w-60 bg-purple-50 p-4 flex flex-col gap-2">
        <img
          src="/logoterciario.png"
          alt="Logo"
          className="w-12 h-12 mb-4 mx-auto"
        />
        {["Anuncios", "Carreras", "Alumnos", "Mensajes"].map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`text-left cursor-pointer px-3 py-2 rounded-md font-medium ${
              selected === item
                ? "bg-white text-purple-600 shadow-md"
                : "text-gray-700 hover:bg-purple-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b px-6 py-3">
          <div></div>
          <div className="flex gap-4">
            <Button variant="text">Principal</Button>
            <Button variant="text">Mi perfil</Button>
            <Button variant="contained" color="inherit">
              Salir
            </Button>
          </div>
        </div>

        {/* Carreras section */}
        <div className="flex-1 p-6">
          <div className="grid gap-4 w-full max-w-xl">
            {[
              { code: "DS", name: "Desarrollo de Software" },
              { code: "AF", name: "Analista Funcional" },
              { code: "ITI", name: "Infraestructura y Tecnología de la Información" },
            ].map((career) => (
              <Card key={career.code} className="border border-purple-200 cursor-pointer" onClick={() => navigate(`/comisiones/${career.code}`)}>
                <CardContent className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
                    {career.code}
                  </div>
                  <p className="font-medium">{career.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carreras;
