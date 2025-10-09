import { useState, useEffect } from "react";
import type { Comunicado } from "../../types/ComunicadoTypes";
import CardComunicado from "../../components/CardComunicado";

export default function Comunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  // Obtener comunicados de la API
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("idUser") || "";
    const type = queryParams.get("type") || "";

    if (userId && type) {
      fetch(
        `${
          import.meta.env.VITE_BACKURL
        }/comunicados/comunicadosfiltro?idUser=${userId}&type=${type}`
      )
        .then((res) => res.json())
        .then((data) => {
          setComunicados(data.respuesta);
          console.log(data.respuesta);
        });
    } else {
      fetch(`${import.meta.env.VITE_BACKURL}/comunicados`)
        .then((res) => res.json())
        .then((data) => setComunicados(data));
    }
  }, [location.search]);

  return (
    <>
      {/* Main Content */}
      <main className="flex flex-col max-h-full mt-1 text-center items-center">
        {comunicados.map((item) => (
          <CardComunicado Item={item} />
        ))}
      </main>
    </>
  );
}
