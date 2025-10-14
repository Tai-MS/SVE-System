import { type JSX } from "react";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";

type Profesor = {
  nombre: string;
  apellido: string;
};

type ComisionUC = {
  profesor: Profesor;
  id: string | number;
};

type Materia = {
  id: string | number;
  nombre: string;
  comisionesUC: ComisionUC[];
  studentsCount?: number;
  description?: string;
};

function UC(): JSX.Element  {
  const [materias, setMaterias] = useState<Materia[] | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMaterias() {
      try {
        const response = await fetch(import.meta.env.VITE_BACKURL + "/unidadcurricular/todas")
        if (!response.ok) {
          throw new Error("Error al cargar las unidades curriculares")
        }
        const data = await response.json()
        setMaterias(data)
        console.log(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterias()
  }, [])


  return (
    <>
    <div className="bg-white shadow min-h-screen p-8 rounded-2xl mt-4">
      <div className="mx-auto">
        <header className="text-center mb-8 text-3xl font-bold text-gray-900">Unidades Curriculares</header>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="font-medium">Error al cargar los datos</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
            
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {materias != undefined && materias.map((materia) => (
              <a href={"UC/detalles/" + materia.id}>
              <Card
                key={materia.id}
                nombre={materia.nombre}
                codigoMateria={materia.id}
                instructor={materia.comisionesUC[0].profesor.nombre + " " + materia.comisionesUC[0].profesor.apellido}
                studentsCount={materia.studentsCount}
                description={materia.description}
                />
              </a>
            ))}
          </div>
        )}

        {!loading && !error && materias === undefined && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">No hay unidades curriculares disponibles</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default UC;