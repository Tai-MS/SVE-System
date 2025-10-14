import { Avatar, Dialog, DialogContent, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import ZonedDateTime from "ts-time/ZonedDateTime";
import type { Comunicado } from "../types/ComunicadoTypes";
import { PenBoxIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Comision } from "../types/ComisionesTypes";

const CardComunicado = ({
  Item,
  misComunicados,
}: {
  Item: Comunicado;
  misComunicados: boolean;
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [comisionTexto, setComisionTexto] = useState<string>("");
  const timeCreado = ZonedDateTime.parse(Item.creado as string);
  const timeActualizado = ZonedDateTime.parse(Item.actualizado as string);
  const navigate = useNavigate();

  useEffect(() => {
    if (Item.id_comision) {
      const fetchComision = async () => {
        try {
          const data = await fetch(
            `${import.meta.env.VITE_BACKURL}/comision/detalles/${
              Item.id_comision
            }`
          );
          const dataJSON: Comision = await data.json();
          setComisionTexto(
            `${dataJSON.division_id}º${dataJSON.numero_comision} ${dataJSON.carrera_id}`
          );
        } catch (err) {
          console.error(err);
          setComisionTexto("No disponible");
        }
      };
      fetchComision();
    }
  }, [Item.id_comision]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar este comunicado?`
    );
    if (confirmDelete) {
      try {
        await fetch(
          `${import.meta.env.VITE_BACKURL}/comunicados/eliminar/${Item.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application-json" },
          }
        );
        navigate("/comunicados");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleUpdate = () => {
    navigate("/comunicados/actualizar/" + Item.id);
  };

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
            <div className="flex flex-col items-start py-2">
              <h2 className="text-gray-500 font-bold">
                {Item.Usuario?.nombre || "Desconocido"}
              </h2>
              <div className="flex flex-row space-x-1">
                <h3 className="text-gray-400">{`${timeCreado.dayOfMonth
                  .toString()
                  .toString()
                  .padStart(2, "0")}/${timeCreado.month.value}/${
                  timeCreado.year
                } ${timeCreado.hour}:${timeCreado.minute
                  .toString()
                  .padStart(2, "0")}`}</h3>
                {timeCreado.compareTo(timeActualizado) && (
                  <h3 className="text-gray-400">
                    (Actualizado:{" "}
                    {`${timeActualizado.dayOfMonth
                      .toString()
                      .toString()
                      .padStart(2, "0")}/${timeActualizado.month.value}/${
                      timeActualizado.year
                    } ${timeActualizado.hour}:${timeActualizado.minute
                      .toString()
                      .padStart(2, "0")}`}
                    )
                  </h3>
                )}
              </div>
              {misComunicados && (
                <h3 className="text-gray-400">
                  Tipo de comunicado:{" "}
                  <b>
                    {Item.general
                      ? "general"
                      : Item.id_comision
                      ? `comisión (${comisionTexto})`
                      : `division (${Item.division}º ${
                          Item.carrera === "ALL" ? "Todos" : Item.carrera
                        })`}
                  </b>
                </h3>
              )}
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
          {misComunicados && (
            <div className="flex flex-row text-black my-2 gap-2">
              <button
                onClick={handleDelete}
                className="mx-auto p-2 bg-red-600 text-white rounded-2xl shadow-md hover:bg-red-800 duration-300"
              >
                <Trash2 />
              </button>
              <button
                onClick={handleUpdate}
                className="mx-auto p-2 bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-800 duration-300"
              >
                <PenBoxIcon />
              </button>
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
