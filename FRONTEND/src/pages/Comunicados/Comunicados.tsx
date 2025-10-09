import { useState, useEffect } from "react";
import type { Comunicado } from "../../types/ComunicadoTypes";
import CardComunicado from "../../components/CardComunicado";

export default function Comunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);

  // Obtener comunicados de la API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKURL}/comunicados/`)
      .then((res) => res.json())
      .then((data: Comunicado[]) => setComunicados(data))
      .catch((err) => console.error("Error cargando comunicados:", err));
  }, []);

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
