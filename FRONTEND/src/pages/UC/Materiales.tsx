import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, FileText, LinkIcon, File } from "lucide-react";
import UCdetalle from "./UCdetalle";

type Material = {
  id: string;
  titulo: string;
  descripcion?: string;
  tipo_material: "TP" | "TAREA" | "MATERIAL";
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
  const { id: materiaId } = (location.state as { id: string | number }) || {};
	console.log("Materia ID:", materiaId);

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
          `${import.meta.env.VITE_BACKURL}/material/traerTodos/${id}`,
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
        console.log(data);
        setClassroomTitle(data.classroomTitle || materiaNombre || "Unidad Curricular");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriales();
  }, [id, materiaNombre]);

  const getIcon = (tipo_material: Material["tipo_material"]) => {
    switch (tipo_material) {
      case "TP":
        return <BookOpen className="h-6 w-6" />
      case "MATERIAL":
        return <FileText className="h-6 w-6" />
      case "TAREA":
        return <LinkIcon className="h-6 w-6" />
      default:
        return <File className="h-6 w-6" />
    }
  }

  const gettipo_materialColor = (tipo_material: Material["tipo_material"]) => {
    switch (tipo_material) {
      case "TP":
        return "bg-blue-100 text-blue-700"
      case "MATERIAL":
        return "bg-red-100 text-red-700"
      case "TAREA":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const gettipo_materialLabel = (tipo_material: Material["tipo_material"]) => {
    const labels = {
      TP: "TP",
      MATERIAL: "MATERIAL",
      TAREA: "TAREA",
    }
    return labels[tipo_material]
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
            onClick={() => navigate(`/UC/detalles/${id}/materiales`)}
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
  console.log(id, materiaNombre);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
				className="rounded-2xl relative h-64 bg-cover bg-center"
				style={{
					//   backgroundImage: undefined,
					backgroundColor: "#4F46E5",
				}}>
				<div className="shadow rounded-2xl absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative mx-auto max-w-4xl px-8 py-8">
					<button
						onClick={() =>
                navigate(`/UC/detalles/${materiaId}`, {
                  state: { id: materiaId, nombre: materiaNombre },
              })
            }       
						className="cursor-pointer mb-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors">
						<ArrowLeft className="h-5 w-5" />
						Volver a detalles
					</button>
          <div className="flex items-center gap-3">
            <div className="mt-8">
						<h1 className="text-4xl font-bold text-white">Materiales y Libros</h1>
						<p className="mt-2 text-xl text-white/90 align-middle">{classroomTitle}</p>
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
                  <div className={`rounded-lg p-3 ${gettipo_materialColor(material.tipo_material)}`}>{getIcon(material.tipo_material)}</div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${gettipo_materialColor(material.tipo_material)}`}>
                    {gettipo_materialLabel(material.tipo_material)}
                  </span>
                </div>

                {/* Título y descripción */}
                <h3 className="text-balance text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {material.titulo}
                </h3>

                {material.descripcion && (
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {material.descripcion}
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
                {/* {material.url && (
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    {material.tipo_material === "enlace" ? "Abrir enlace" : "Descargar"}
                  </a>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
