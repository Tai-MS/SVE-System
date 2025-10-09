import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Comisiones() {
  const [selected, setSelected] = useState("Comisiones");
  const [comisiones, setComisiones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { carreraId } = useParams();
  const navigate = useNavigate();

const comision = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKURL + `/comision/traerTodas/${carreraId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al traer COMISIONES: ", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await comision();
      setComisiones(result);
      setLoading(false);
    };
    fetchData();
  }, [carreraId]);

  return (
    <div className="flex h-screen mt-4">
      {/* Sidebar */}
      <div className="w-60 bg-purple-50 p-4 flex flex-col gap-2">
        <img src="/logoterciario.png" alt="Logo" className="w-12 h-12 mb-4 mx-auto" />
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
          {loading ? (
            <p className="text-gray-500">Cargando comisiones...</p>
          ) : comisiones.length === 0 ? (
            <p className="text-gray-500">No hay comisiones registradas para esta carrera.</p>
          ) : (
            comisiones.map((comision: any) => (
              <Accordion key={comision.id} className="border border-purple-100 shadow-sm">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className="font-medium text-purple-700">
                    Comisión {comision.numero_comision}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="flex flex-col gap-2">
                  <Typography>Cupo máximo: {comision.cupo_maximo}</Typography>
                  <Typography>Alumnos inscriptos: {comision.cant_alumnos}</Typography>
                  <Typography>
                    Estado:{" "}
                    {comision.activo ? (
                      <span className="text-green-600 font-semibold">Activa</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactiva</span>
                    )}
                  </Typography>
                  <Typography>Año de creación: {comision.anio_creacion}</Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/materias/${comision.id}`)}
                    className="w-fit mt-2"
                  >
                    Ver materias
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Comisiones;