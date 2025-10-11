import { Avatar, Dialog, DialogContent, IconButton } from "@mui/material";
import { useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import ZonedDateTime from "ts-time/ZonedDateTime";
import type { Comunicado } from "../types/ComunicadoTypes";

const CardComunicado = ({ Item }: { Item: Comunicado }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const time = ZonedDateTime.parse(Item.creado as string);
  return (
    <>
      <main
        key={Item.id}
        className="mb-4 w-full h-auto border-2 border-gray-200 rounded-4xl"
      >
        <div className="flex flex-col p-4 items-start">
          <div className="flex flex-row space-x-4 items-center ">
            <Avatar className="">
              {Item.Usuario?.nombre?.charAt(0) || "?"}
            </Avatar>
            <div className="flex flex-col items-start space-y-1 py-2">
              <h2 className="text-gray-500 font-bold">
                {Item.Usuario?.nombre || "Desconocido"}
              </h2>
              <h3 className="text-gray-400">{`${time.month.value}/${time.month.value}/${time.year}`}</h3>
            </div>
          </div>
          <h1 className="text-gray-700 mb-3">{Item.titulo}</h1>
          <h2 className="text-gray-800">{Item.descripcion}</h2>
          {Item.img && Item.img.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {Item.img.map((ruta, idx) => (
                <img
                  key={idx}
                  src={ruta}
                  className="w-32 h-32 object-cover rounded-lg border cursor-pointer"
                  onClick={() => setSelectedImg(ruta)}
                />
              ))}
            </div>
          )}
        </div>
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
    </>
  );
};

export default CardComunicado;
