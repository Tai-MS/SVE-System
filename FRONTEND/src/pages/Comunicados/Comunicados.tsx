import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";


interface Usuario {
  id?: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono?: string;
  email: string;
  anioIngreso: number;
  rol: string;
  contraseña: string;
  activo?: boolean;
  creado?: Date;
  ultima_conexion?: Date;
  token?: string;
}

interface Comunicado {
  id?: string;
  id_usuario: string;
  titulo: string;
  descripcion: string;
  eliminado: boolean;
  archivos?: string;
  general?: boolean;
  division?: number;
  id_comision?: string;
  usuario?: Usuario;
  creado?: string | Date;
}

export default function Comunicados() {
  
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [nuevoComunicado, setNuevoComunicado] = useState<string>("");

  // Obtener comunicados de la API
  useEffect(() => {
    fetch("http://localhost:8080/comunicados/")
      .then((res) => res.json())
      .catch((err) => console.error("Error cargando comunicados:", err));
  }, []);

  // Publicar un nuevo comunicado
  const publicarComunicado = () => {
    if (!nuevoComunicado.trim()) return;

    const nuevo: Comunicado = {
      id_usuario: "0311b037-c1fa-46b1-8dde-5b7f7b669445", // reemplazar con ID real
      titulo: "Nuevo Comunicado",
      descripcion: nuevoComunicado,
      eliminado: false,
      creado: new Date().toISOString(),
    };

    fetch(import.meta.env.VITE_BACKURL + "/comunicados/crear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    })
      .then((res) => res.json())
      .then((data: Comunicado) => {
        setComunicados((prev) => [data, ...prev]);
        setNuevoComunicado("");
      })
      .catch((err) => console.error("Error publicando comunicado:", err));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevoComunicado(e.target.value);
  };

  return (
    <div className="flex h-screen">
      
      <Sidebar />


      <main className="mt-32 ml-64 flex flex-grow flex-col px-52">
        <h1 className="pb-4 text-2xl flex items-center justify-center text-black">Comunicados</h1>
        {localStorage.getItem("rol") !== undefined && localStorage.getItem("rol") !== "ESTUDIANTE" ?(
        <div className="mb-6">
          <TextField
            multiline
            fullWidth
            rows={4}
            placeholder="Anuncia algo al alumnado"
            variant="outlined"
            className="bg-white"
            value={nuevoComunicado}
            onChange={handleChange}
          />
          <div className="flex justify-end mt-2">
            
            <Button
              variant="contained"
              color="secondary"
              onClick={publicarComunicado}
            >
              Publicar
            </Button>
          </div>
        </div>
        ) : (<></>)}

        {comunicados.map((item) => (
          <Card key={item.id || Math.random()} className="mb-4">
            <CardContent className="flex items-start gap-4">
              <Avatar className="bg-purple-300">
                {item.usuario?.nombre?.charAt(0) || "?"}
              </Avatar>
              <div>
                <Typography variant="subtitle2">
                  {item.usuario?.nombre || "Desconocido"}
                </Typography>
                <Typography variant="subtitle1">{item.titulo}</Typography>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <Typography>{item.descripcion}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
