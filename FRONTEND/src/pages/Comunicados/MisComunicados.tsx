import { useState, useEffect } from "react";
import type { Comunicado } from "../../types/ComunicadoTypes";
import CardComunicado from "../../components/CardComunicado";
import { apiFetch } from "../../hooks/validarToken";

export default function MisComunicados() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const idUser = localStorage.getItem("userId");
  useEffect(() => {
    const fetchComunicados = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKURL
        }/comunicados/comunicadosUsuario/${idUser}`;

        const res = await apiFetch(url);
        const data = await res.json();

        setComunicados(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al obtener comunicados:", err);
        setComunicados([]);
      }
    };

    fetchComunicados();
  }, []);

  return (
    <main className="flex flex-col max-h-full mt-1 justify-center">
      {comunicados.length > 0 ? (
        comunicados.map((item) => (
          <CardComunicado key={item.id} Item={item} misComunicados={true} />
        ))
      ) : (
        <h1 className="font-bold text-black">
          No se encontró ningún comunicado
        </h1>
      )}
    </main>
  );
}
