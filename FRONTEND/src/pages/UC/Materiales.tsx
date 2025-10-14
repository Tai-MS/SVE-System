import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, Video, LinkIcon, File, Download } from "lucide-react";

type Material = {
  id: string;
  title: string;
  description?: string;
  type: "libro" | "pdf" | "video" | "enlace" | "documento";
  url?: string;
  author?: string;
  publishDate?: string;
  fileSize?: string;
};

export default function Materiales() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { nombre: materiaNombre } =
    (location.state as { id: string; nombre: string }) || {};

  const [materiales, setMateriales ] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classroomTitle, setClassroomTitle] = useState<string>("");

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKURL}/materiales/traerTodos`,
          {
            headers: {
              token: localStorage.getItem("token") || "",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Error al cargar los materiales");

        const data = await response.json();
        setMateriales (data.materiales || data);
        setClassroomTitle(data.classroomTitle || materiaNombre || "Unidad Curricular");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriales();
  }, [id, materiaNombre]);

  const getIcon = (type: Material["type"]) => {
    switch (type) {
      case "libro":
        return <BookOpen className="h-6 w-6" />
      case "pdf":
        return <FileText className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      case "enlace":
        return <LinkIcon className="h-6 w-6" />
      default:
        return <File className="h-6 w-6" />
    }
  }

  const getTypeColor = (type: Material["type"]) => {
    switch (type) {
      case "libro":
        return "bg-blue-100 text-blue-700"
      case "pdf":
        return "bg-red-100 text-red-700"
      case "video":
        return "bg-purple-100 text-purple-700"
      case "enlace":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeLabel = (type: Material["type"]) => {
    const labels = {
      libro: "Libro",
      pdf: "PDF",
      video: "Video",
      enlace: "Enlace",
      documento: "Documento",
    }
    return labels[type]
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate(`/classroom/${id}`)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver
          </button>
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
            <p className="font-medium">Error al cargar los materiales</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-8 py-6">
          <button
            onClick={() => navigate(`/classroom/${id}`)}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a detalles
          </button>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Materiales y Libros</h1>
              <p className="text-gray-600">{classroomTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="mx-auto max-w-6xl px-8 py-8">
        {materiales.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay materiales disponibles</h3>
            <p className="mt-2 text-gray-500">Aún no se han agregado materiales a esta unidad curricular.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materiales.map((material) => (
              <div
                key={material.id}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
              >
                {/* Thumbnail o icono */}
                <div className="mb-4 flex items-center justify-between">
                  <div className={`rounded-lg p-3 ${getTypeColor(material.type)}`}>{getIcon(material.type)}</div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(material.type)}`}>
                    {getTypeLabel(material.type)}
                  </span>
                </div>

                {/* Título y descripción */}
                <h3 className="text-balance text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {material.title}
                </h3>

                {material.description && (
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {material.description}
                  </p>
                )}

                {/* Metadata */}
                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  {material.author && (
                    <p>
                      <span className="font-medium">Autor:</span> {material.author}
                    </p>
                  )}
                  {material.publishDate && (
                    <p>
                      <span className="font-medium">Fecha:</span> {material.publishDate}
                    </p>
                  )}
                  {material.fileSize && (
                    <p>
                      <span className="font-medium">Tamaño:</span> {material.fileSize}
                    </p>
                  )}
                </div>

                {/* Botón de acción */}
                {material.url && (
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    {material.type === "enlace" ? "Abrir enlace" : "Descargar"}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
