import { type JSX } from "react";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Profesor = {
  nombre: string;
  apellido: string;
};

type ComisionUC = {
  profesor: Profesor;
  id: string | number;
};

type Materias = {
  id: string | number;
  nombre: string;
  comisionesUC: ComisionUC[];
  studentsCount?: number;
  description?: string;
};

function UC(): JSX.Element {
  const [materias, setMaterias] = useState<Materias[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMaterias() {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKURL + "/unidadcurricular/todas",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token") || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al cargar las unidades curriculares");
        }

        const data = await response.json();

        setMaterias(data.UnidadCurriculars);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterias();
  }, []);

  return (
    <>
      <main className="bg-white shadow min-h-screen p-8 rounded-2xl mt-4">
        <div className="mx-auto max-w-7xl">
          <header className="text-center mb-8 text-3xl font-bold text-gray-900">
            Unidades Curriculares
          </header>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
            >
              <p className="font-medium">Error al cargar los datos</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {materias && materias.length > 0 ? (
                materias.map((materia) => {
                  const instructor =
                    materia.comisionesUC.length > 0
                      ? `${materia.comisionesUC[0].profesor.nombre} ${materia.comisionesUC[0].profesor.apellido}`
                      : "No asignado";

                  return (
                    <div
                      key={materia.id}
                      onClick={() =>
                        navigate(`/UC/detalles/${materia.id}`, {
                          state: { id: materia.id, nombre: materia.nombre },
                        })
                      }
                      className="cursor-pointer"
                      aria-label={`Ver detalles de ${materia.nombre}`}
                    >
                      <Card
                        nombre={materia.nombre}
                        codigoMateria={materia.id}
                        instructor={
                          localStorage.getItem("rol") === "ADMINISTRADOR"
                            ? undefined
                            : instructor
                        }
                        studentsCount={materia.studentsCount}
                        description={materia.description}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-600">
                  No hay unidades curriculares para mostrar.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default UC;
