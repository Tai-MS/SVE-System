import { useState, useEffect } from "react";
import type { Comunicado } from "../../types/ComunicadoTypes";
import CardComunicado from "../../components/CardComunicado";
import { useLocation } from "react-router-dom";

export default function Comunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("idUser") || "";
    const type = queryParams.get("type") || "";
    const career = queryParams.get("career") || "";
    const fetchComunicados = async () => {
      try {
        let url = `${import.meta.env.VITE_BACKURL}/comunicados`;
        if (userId && type) {
          url += `/comunicadosfiltro?idUser=${userId}&type=${type}&career=${career}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setComunicados(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al obtener comunicados:", err);
        setComunicados([]);
      }
    };

    fetchComunicados();
  }, [location.search]);

  return (
    <main className="flex flex-col max-h-full mt-1 text-center items-center content-center">
      {comunicados.length > 0 ? (
        comunicados.map((item) => (
          <CardComunicado key={item.id} Item={item} misComunicados={false} />
        ))
      ) : (
        <h1 className="font-bold text-black">
          No se encontró ningún comunicado
        </h1>
      )}
    </main>
  );
}
