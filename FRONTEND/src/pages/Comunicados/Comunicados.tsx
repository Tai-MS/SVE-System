import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { ExpandLess, ExpandMore, Close as CloseIcon } from "@mui/icons-material";

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
  img?: string[];
  general?: boolean;
  division?: number;
  id_comision?: string;
  Usuario?: Usuario;
  creado?: string | Date;
}

export default function Comunicados() {
  const [open, setOpen] = useState(false);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [nuevoComunicado, setNuevoComunicado] = useState<string>("");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const navigate = useNavigate();

  // Obtener comunicados de la API
  useEffect(() => {
    fetch("http://localhost:8080/comunicados/")
      .then((res) => res.json())
      .then((data: Comunicado[]) => setComunicados(data))
      .catch((err) => console.error("Error cargando comunicados:", err));
  }, []);

  // Publicar un nuevo comunicado
  const handleRedirect = () => {
    navigate("/comunicados/crear/" + localStorage.getItem("userId"));
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
        <div className="flex center mt-2">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRedirect}
          >
            Ir a publicar
          </Button>
        </div>

        {comunicados.map((item) => (
          <Card key={item.id || Math.random()} className="mb-4">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="bg-purple-300">
                  {item.Usuario?.nombre?.charAt(0) || "?"}
                </Avatar>
                <div>
                  <Typography variant="subtitle2">
                    {item.Usuario?.nombre || "Desconocido"}
                  </Typography>
                  <Typography variant="subtitle1" className="font-bold">
                    {item.titulo}
                  </Typography>
                  <Typography className="mt-2">{item.descripcion}</Typography>
                </div>
              </div>
              {item.img && item.img.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {item.img.map((ruta, idx) => (
                    <img
                      key={idx}
                      src={ruta}
                      className="w-32 h-32 object-cover rounded-lg border cursor-pointer"
                      onClick={() => setSelectedImg(ruta)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Dialog
          open={!!selectedImg}
          onClose={(_, reason) => {
            if (reason === "backdropClick" || reason === "escapeKeyDown") {
              setSelectedImg(null);
            }
          }}
          fullWidth
          maxWidth="md"
        >
          <DialogContent
            sx={{
              position: "relative",
              p: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setSelectedImg(null)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImg && (
              <img
                src={selectedImg}
                alt="Imagen ampliada"
                className="max-h-[90vh] w-auto rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
