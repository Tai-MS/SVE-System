import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function Materias() {
  const [open, setOpen] = useState(false);
  const { comisionId } = useParams();
  const materias = [
    { id: "prog2", nombre: "Programación-II", profesor: "Juan-Pérez" },
    { id: "bd2", nombre: "Bases-de-Datos-II", profesor: "Ana-García" },
    { id: "pp2", nombre: "Práctica-Profesionalizante-II", profesor: "Carlos-Díaz" },
    { id: "redes", nombre: "Redes-y-Comunicación", profesor: "Miguel-Pan" },
    { id: "derecho", nombre: "Derecho-y-Legislación-Laboral", profesor: "Ramón-Suárez" },
    { id: "gestion", nombre: "Gestión-de-Proyectos-de-Software", profesor: "José-Ruiz" }
  ];

  return (
    <div className="flex h-screen mt-1">

        {/* Content */}
        <main className="p-6 mt-3">
          <h1 className="text-xl font-semibold mb-4">
            Materias - {comisionId}
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {materias.map((m) => (
              <CourseCard key={m.id} id={m.id} title={m.nombre} teacher={m.profesor} />
            ))}
          </div>
        </main>
      </div>

  );
}

/* Subcomponente para tarjetas de cursos */
function CourseCard({
  id,
  title,
  teacher
}: {
  id: string;
  title: string;
  teacher: string;
}) {
  const navigate = useNavigate();
  return (
    <Card className="w-64 shadow-md cursor-pointer" onClick={() => navigate(`/unidadcurricular/${id}/${title}/${teacher}`)}>
      <CardContent className="relative">
        <div className="bg-purple-300 text-white p-3 rounded-md">
          <Typography variant="subtitle1" className="truncate">
            {title}
          </Typography>
          <Typography variant="body2">{teacher}</Typography>
        </div>
        <Avatar className="absolute -bottom-5 right-3 bg-purple-300">R</Avatar>
      </CardContent>
    </Card>
  );
}