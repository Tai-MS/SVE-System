import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

function UnidadCurricular() {
  const [selected, setSelected] = useState("Unidad Curricular");
  const [tab, setTab] = useState(0);
  const { materiaId } = useParams();
  const { materiaNombre } = useParams();
  const { materiaProfe } = useParams();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-purple-50 p-4 flex flex-col gap-2">
        <img
          src="/logoterciario.png"
          alt="Logo"
          className="w-12 h-12 mb-4 mx-auto"
        />
        {["Anuncios", "Unidad Curricular", "Alumnos", "Mensajes"].map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`text-left px-3 py-2 rounded-md font-medium ${
              selected === item
                ? "bg-white text-purple-600 shadow-md"
                : "text-gray-700 hover:bg-purple-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main content */}
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

        {/* Tabs */}
        <div className="border-b px-6 mt-10">
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label="Inicio" />
            <Tab label="Trabajos" />
            <Tab label="Personas" />
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex gap-6">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Subject card */}
            <Card className="bg-teal-600 text-white rounded-lg shadow">
              <CardContent>
                <Typography variant="h6" className="font-semibold">
                  Materia - {materiaNombre}
                </Typography>
                <Typography variant="body2">Profesor - {materiaProfe}</Typography>
                <Typography variant="body2">Comisión - {materiaId}</Typography>
              </CardContent>
            </Card>

            {/* List of works/messages */}
            {[1, 2].map((i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar sx={{ bgcolor: "#e0e0e0", width: 32, height: 32 }}>
                      D
                    </Avatar>
                    <div>
                      <Typography variant="body2" className="font-medium">
                        Profesor - {materiaProfe}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Subhead
                      </Typography>
                    </div>
                  </div>
                  <Box className="bg-gray-100 h-20 rounded-md"></Box>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right column (Pendientes) */}
          <div className="w-64">
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" className="font-medium mb-2">
                  Pendientes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sin trabajos pendientes
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnidadCurricular;
