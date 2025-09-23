import { useState } from "react";
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-56 h-screen border-r bg-purple-100 p-2">
        <img src="/logoterciario.png" alt="Logo" className="h-12 w-12 rounded-full object-cover" />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Anuncios" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected>
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
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between p-3 border-b bg-white">
          <div />
          <nav className="flex gap-4 text-sm">
            <Button variant="text" className="mr-2">Principal</Button>
            <Button variant="text" className="mr-2 font-bold">Mi perfil</Button>
            <Button variant="contained" color="inherit">
              Salir
            </Button>
          </nav>
        </header>

        {/* Content */}
        <main className="p-6">
          <h1 className="text-xl font-semibold mb-4">
            Desarrollo de Software - 3ero 2da
          </h1>
          <div className="grid grid-cols-3 gap-4">
            <CourseCard
              title="DS-32 - Programación II"
              teacher="Prof. Juan Pérez"
            />
            <CourseCard
              title="DS-32 - Bases de Datos II"
              teacher="Prof. Juan Pérez"
            />
            <CourseCard
              title="DS-32 - PractProf II"
              teacher="Prof. Juan Pérez"
            />
            <CourseCard
              title="DS-32 - Redes"
              teacher="Prof. Juan Pérez"
            />
            <CourseCard
              title="DS-32 - Derecho"
              teacher="Prof. Juan Pérez"
            />
            <CourseCard
              title="DS-32 - Gestión"
              teacher="Prof. Juan Pérez"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

/* Subcomponente para tarjetas de cursos */
function CourseCard({
  title,
  teacher,
}: {
  title: string;
  teacher: string;
}) {
  return (
    <Card className="w-64 shadow-md">
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