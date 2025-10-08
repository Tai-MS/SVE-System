import { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import type { Comunicado } from "../../types/UsuarioTypes";

export default function Comunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Obtener comunicados de la API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKURL}/comunicados/`)
      .then((res) => res.json())
      .then((data: Comunicado[]) => setComunicados(data))
      .catch((err) => console.error("Error cargando comunicados:", err));
  }, []);

  return (
    <div className="">
      {/* Main Content */}
      <main className="flex max-h-full mt-1 text-center items-center">
        {comunicados.length === 0 && <h1>TODAVIA NO HAY ANUNCIOS</h1>}
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
