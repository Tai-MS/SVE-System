import { useState } from "react";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Comisiones() {
  const [selected, setSelected] = useState("Comisiones");

  return (
    <div className="flex h-screen">
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
          <h1 className="text-xl font-semibold mb-4">Desarrollo de Software</h1>

          <div className="grid gap-3 w-full max-w-xl">
            {/* 1er Año */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>1er Año</Typography>
              </AccordionSummary>
            </Accordion>

            {/* 2do Año */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>2do Año</Typography>
              </AccordionSummary>
            </Accordion>

            {/* 3er Año */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>3er Año</Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-purple-50">
                <div className="flex flex-col gap-2">
                  <Card className="p-2 shadow-sm">3ero 1era</Card>
                  <Card className="p-2 shadow-sm">3ero 2da</Card>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comisiones;
