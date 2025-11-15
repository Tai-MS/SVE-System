'use client'
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Comunicado {
  id: number;
  autor: string;
  titulo: string;
  fecha: string;
  contenido: string;
}

export default function Comunicados() {
  const [open, setOpen] = useState(false);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [nuevoComunicado, setNuevoComunicado] = useState<string>("");
  
  useEffect(() => {
  fetch(import.meta.env.VITE_BACKURL + "/comunicados/", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => setComunicados(data))
    .catch((err) => console.error("Error cargando comunicados:", err));
}, []);

  // Publicar un nuevo comunicado
  const publicarComunicado = () => {
    if (nuevoComunicado.trim() !== "") {
      const nuevo = {
        autor: "Admin",
        titulo: "Nuevo Comunicado",
        fecha: new Date().toLocaleString(),
        contenido: nuevoComunicado,
      };

      fetch(import.meta.env.VITE_BACKURL + "/comunicados/crearComunicado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevo),
      })
        .then((res) => res.json())
        .then((data) => {
          setComunicados([data, ...comunicados]);
          setNuevoComunicado("");
        })
        .catch((err) => console.error("Error publicando comunicado:", err));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevoComunicado(e.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-56 h-screen border-r bg-purple-100 p-2">
        <img
          src="/logoterciario.png"
          alt="Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <List>
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemText primary="Anuncios" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Unidades Curriculares" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Alumnos" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemText primary="Mensajes" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Recibidos" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Enviados" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h6">Comunicados</Typography>
          <div>
            <Button variant="text" className="mr-2">
              Principal
            </Button>
            <Button variant="text" className="mr-2 font-bold">
              REGENCIA
            </Button>
            <Button variant="contained" color="inherit">
              Salir
            </Button>
          </div>
        </div>

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

        {comunicados.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="flex items-start gap-4">
              <Avatar className="bg-purple-300">{item.autor.charAt(0)}</Avatar>
              <div>
                <Typography variant="subtitle1">{item.titulo}</Typography>
                <Typography variant="caption">{item.fecha}</Typography>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <Typography>{item.contenido}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
