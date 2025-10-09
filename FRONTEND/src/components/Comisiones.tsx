import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Card,
} from "@mui/material";
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
    { id: "32", nombre: "3ero 2da" },
  ];

  return (
    <div className="flex h-screen mt-4">
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
  );
}

export default Comisiones;
