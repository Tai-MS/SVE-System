import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
interface Comunicado {
  id_usuario: string;
  titulo: string;
  descripcion: string;
  img: File[];
}

const CrearComunicado: React.FC = () => {
  const [comunicado, setComunicado] = useState<Comunicado>({
    id_usuario: localStorage.getItem("userId") || "",
    titulo: "",
    descripcion: "",
    img: [],
  });
  const navigate = useNavigate();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComunicado({ ...comunicado, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setComunicado({ ...comunicado, img: [...comunicado.img, ...filesArray] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_usuario", comunicado.id_usuario);
    formData.append("titulo", comunicado.titulo);
    formData.append("descripcion", comunicado.descripcion);

    comunicado.img.forEach((file) => {
      formData.append("img", file);
    });

    try {
      const res = await fetch("http://localhost:8080/comunicados/crear", {
        method: "POST",
        body: formData,
      });

      const dataJson = await res.json();
      console.log("Respuesta backend:", dataJson);
      navigate("/comunicados");
    } catch (err) {
      console.error("Error al enviar comunicado:", err);
    }
  };

  return (
    <section className="flex flex-col items-center py-8 px-4 text-black">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear Comunicado Escolar
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              name="titulo"
              value={comunicado.titulo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Escribe el título del comunicado"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={comunicado.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="Escribe la descripción del comunicado"
              required
            />
          </div>

          {/* Subir imágenes */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subir Imágenes
            </label>
            <input
              type="file"
              name="img"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full"
            />
            {comunicado.img.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {comunicado.img.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Publicar Comunicado
          </button>
        </form>
      </div>
    </section>
  );
};

export default CrearComunicado;
