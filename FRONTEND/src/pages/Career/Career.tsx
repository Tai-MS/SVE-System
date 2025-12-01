"use client"

import { useNavigate } from "react-router-dom"

type Career = {
    id: string
    name: string
    abbreviation: string
    description: string
    color: string
    icon: string
}

const careers: Career[] = [
  {
    id: "af",
    name: "Analista Funcional",
    abbreviation: "AF",
    description: "Análisis y diseño de sistemas",
    color: "from-blue-500 to-blue-600",
    icon: "💼",
  },
  {
    id: "ds",
    name: "Desarrollo de Software",
    abbreviation: "DS",
    description: "Programación y diseño de aplicaciones",
    color: "from-green-500 to-green-600",
    icon: "💻",
  },
  {
    id: "iti",
    name: "Infraestructura de TI",
    abbreviation: "ITI",
    description: "Redes y sistemas de información",
    color: "from-purple-500 to-purple-600",
    icon: "🔧",
  },
]

export default function CareerSelection() {
  const navigate = useNavigate()

  const handleCareerSelect = (careerId: string) => {
    navigate(`/career/${careerId}/classrooms`)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-center flex-col text-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Seleccionar Carrera</h1>
            <p className="mt-2 text-lg text-gray-600">Elige una carrera para ver sus unidades curriculares</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <button
              key={career.id}
              onClick={() => handleCareerSelect(career.id)}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 text-left shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${career.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-5xl">{career.icon}</span>
                  <span
                    className={`rounded-full bg-gradient-to-br ${career.color} px-4 py-1 text-sm font-bold text-white`}
                  >
                    {career.abbreviation}
                  </span>
                </div>

                <h2 className="mb-3 text-2xl font-bold text-gray-900">{career.name}</h2>

                <p className="text-gray-600">{career.description}</p>

                <div className="mt-6 flex items-center text-sm font-medium text-gray-900">
                  <span>Ver unidades curriculares</span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
