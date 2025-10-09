import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { crearComunicado } from "../../types/ComunicadoTypes";
import type { Usuario } from "../../types/UsuarioTypes";

const CrearComunicado: React.FC = () => {
  const [comunicado, setComunicado] = useState<crearComunicado>({
    id_usuario: localStorage.getItem("userId") || "",
    titulo: "",
    descripcion: "",
    img: [],
  });
  const [usuario, setUsuario] = useState<Usuario>();
  const [selectTipoComunicado, setSelectTipoComunicado] =
    useState<string>("none");
  const [selectTipoCarrera, setSelectTipoCarrera] = useState<string>("none");

  useEffect(() => {
    const id_usuario = localStorage.getItem("userId");
    const fetchFunction = async () => {
      const fetchData = await fetch(
        `${
          import.meta.env.VITE_BACKURL
        }/usuarios/obtenerUsuario?id=${id_usuario}`
      );
      const jsonData = await fetchData.json();
      setUsuario(jsonData);
      console.log(jsonData);
    };
    fetchFunction();
  }, []);

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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "tipo_comunicado") {
      setSelectTipoComunicado(e.target.value);
    } else if (e.target.name === "tipo_carrera") {
      setSelectTipoCarrera(e.target.value);
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
      const res = await fetch(
        `${import.meta.env.VITE_BACKURL}/comunicados/crear`,
        {
          method: "POST",
          body: formData,
        }
      );

      const dataJson = await res.json();
      console.log("Respuesta backend:", dataJson);
      navigate("/comunicados");
    } catch (err) {
      console.error("Error al enviar comunicado:", err);
    }
  };

  const opcionesExtra =
    usuario?.rol === "ADMINISTRADOR" || usuario?.rol === "BEDELÍA" ? (
      <>
        <option value="general">- General (toda la escuela)</option>
        <option value="division">- División</option>
      </>
    ) : null;

  return (
    <section className="flex flex-col items-center w-full h-full text-black justify-center">
      <div className="bg-white rounded-lg shadow-2xl shadow-gray-700 w-[40%] h-auto items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear Comunicado Escolar
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Título:
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
              Descripción:
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

          {/* Quienes pueden verlo */}
          <div>
            <label
              htmlFor="tipo_comunicado"
              className="block text-gray-700 font-medium mb-2"
            >
              Comunicar a:
            </label>
            <select
              name="tipo_comunicado"
              id="tipo_comunicado"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              onChange={handleSelect}
              required
            >
              <option value="none">
                Seleccionar quienes deben recibir el comunicado...
              </option>
              {opcionesExtra}
              <option value="comision">- Comisión</option>
            </select>
          </div>

          {selectTipoComunicado === "division" && (
            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="tipo_carrera"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Para que carrera?:
                </label>
                <select
                  name="tipo_carrera"
                  id="tipo_carrera"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                  onChange={handleSelect}
                  required
                >
                  <option value="none">Seleccionar la carrera...</option>
                  <option value="ds">- Programación (DS)</option>
                  <option value="af">- Sistemas (AF)</option>
                  <option value="iti">
                    - Redes y Sistemas Operativos (ITI)
                  </option>
                  <option value="todas">- Todas</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor=""
                  className="block text-gray-700 font-medium mb-2"
                >
                  Que division?:
                </label>
                <select
                  name="tipo_comunicado"
                  id="tipo_comunicado"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                  onSelect={handleSelect}
                  required
                >
                  <option value="none">
                    Seleccionar que división va a recibir el comunicado...
                  </option>
                  <option value="id_division_1">- Primero (1ro)</option>
                  <option value="id_division_2">- Segundo (2do)</option>
                  <option value="id_division_3">- Tercero (3ro)</option>
                </select>
              </div>
            </div>
          )}

          {selectTipoComunicado === "comision" && (
            <div>
              <label
                htmlFor="tipo_comision"
                className="block text-gray-700 font-medium mb-2"
              >
                Que comisión?:
              </label>
              <select
                name="tipo_comision"
                id="tipo_comision"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                onSelect={handleSelect}
                required
              >
                <option value="none">
                  Seleccionar que comisión va a recibir el comunicado...
                </option>
                <option value="general">- General (toda la escuela)</option>
                <option value="division">- División</option>
                <option value="comision">- Comisión</option>
              </select>
            </div>
          )}
          {/* Subir imágenes */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subir Imágenes:
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
