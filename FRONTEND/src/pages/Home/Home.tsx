import { type JSX } from "react";
import Sidebar from "../../components/Sidebar";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import type {Classroom}  from "../../types/Classroom";

function Home(): JSX.Element  {
  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoading(true)
        setError(null)

        // Reemplaza esta URL con tu endpoint de API
        const response = await fetch(import.meta.env.VITE_BACKURL + "/unidadcurricular/todas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token") || ""
          }
        })

        if (!response.ok) {
          throw new Error("Error al cargar las unidades curriculares")
        }

        const data = await response.json()
        console.log(data)
        setClassrooms(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
        console.error("Error fetching classrooms:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchClassrooms()
  }, [])

  return (
    <>
    <Sidebar />

    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Unidades Curriculares</h1>

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
            {classrooms.map((classroom) => (
              <Card
                key={classroom.id}
                nombre={classroom.nombre}
                instructor={classroom.profesor}
                instructorAvatar={classroom.instructorAvatar}
                coverImage={classroom.coverImage}
                coverColor={classroom.coverColor}
                studentsCount={classroom.studentsCount}
                description={classroom.description}
              />
            ))}
          </div>
        )}

        {!loading && !error && classrooms.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">No hay unidades curriculares disponibles</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Home;