import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Comisiones() {
  const [selected, setSelected] = useState("Comisiones");
  const { carreraId } = useParams();
  const navigate = useNavigate();

  const comisiones = [
    { id: "11", nombre: "1ero 1ra" },
    { id: "12", nombre: "1ero 2da" },
    { id: "13", nombre: "1ero 3ra" },
    { id: "14", nombre: "1ero 4ta" },
    { id: "21", nombre: "2do 1ra" },
    { id: "22", nombre: "2do 2da" },
    { id: "23", nombre: "2do 3ra" },
    { id: "31", nombre: "3ero 1ra" },
    { id: "32", nombre: "3ero 2da" }
  ];

  return (
    <div className="flex h-screen mt-4">
      {/* Sidebar */}
      <div className="w-60 bg-purple-50 p-4 flex flex-col gap-2">
        <img
          src="/logoterciario.png"
          alt="Logo"
          className="w-12 h-12 mb-4 mx-auto"
        />
        {["Anuncios", "Comisiones", "Alumnos", "Mensajes"].map((item) => (
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

        {/* Comisiones section */}
        <div className="flex-1 p-6">
          <h1 className="text-xl font-semibold mb-4">Comisiones - {carreraId}</h1>
          {comisiones.map((com) => (
          <Accordion key={com.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{com.nombre}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                className="cursor-pointer text-purple-600"
                onClick={() => navigate(`/materias/${com.id}`)}
              >
                Ir a {com.nombre}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Comisiones;
