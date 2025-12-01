import { Users, Calendar, MoreVertical } from "lucide-react"

interface CardProps {
  nombre: string
  instructor?: string
  codigoMateria?: string | number
  instructorAvatar?: string
  coverImage?: string
  coverColor?: string
  studentsCount?: number
  nextClass?: string
  description?: string
}

export function Card({
  nombre,
  instructor,
  codigoMateria,
  instructorAvatar,
  coverImage,
  coverColor = "#1967d2",
  studentsCount,
  nextClass,
  description,
}: CardProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Header con imagen o color */}
      <div
        className="relative h-32 bg-cover bg-center"
        style={{
          backgroundImage: coverImage ? `url(${coverImage})` : undefined,
          backgroundColor: !coverImage ? coverColor : undefined,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

        {/* Botón de opciones */}
        <button className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-gray-700 transition-colors hover:bg-white">
          <MoreVertical className="h-4 w-4" />
        </button>

        {/* Título y código */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-balance text-xl font-semibold text-white">{nombre}</h3>
          <p className="mt-1 text-sm text-white/90">{codigoMateria}</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Instructor */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          {instructorAvatar ? (
            <img
              src={instructorAvatar || "/placeholder.svg"}
              alt={instructor}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
              <Users className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{instructor}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Descripción */}
        {description && <p className="mt-3 text-pretty text-sm text-gray-600 line-clamp-2">{description}</p>}

        {/* Información adicional */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          {studentsCount !== undefined && (
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{studentsCount} estudiantes</span>
            </div>
          )}
          {nextClass && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">{nextClass}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
