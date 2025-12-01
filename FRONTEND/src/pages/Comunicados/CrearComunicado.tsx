import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
// import type { Comunicado } from "../../types/ComunicadoTypes";
import type { Comision } from "../../types/ComisionesTypes";
import { apiFetch } from "../../hooks/validarToken";

const CrearComunicado: React.FC = () => {
  const [comunicado, setComunicado] = useState({
    id_usuario: localStorage.getItem("userId") || "",
    titulo: "",
    descripcion: "",
  });

  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imagenesFiles, setImagenesFiles] = useState<File[]>([]);
  const [comisiones, setComisiones] = useState<Comision[]>([]);
  const [selectTipoComunicado, setSelectTipoComunicado] =
    useState<string>("none");
  const [selectTipoCarrera, setSelectTipoCarrera] = useState<string>("none");
  const [selectDivision, setSelectDivision] = useState<number>(0);
  const [selectComision, setSelectComision] = useState<number>(0);
  const [mensajeError, setMensajeError] = useState<string>("");

  const rol_usuario = localStorage.getItem("rol");
  useEffect(() => {
    const fetchFunction = async () => {
      const url = import.meta.env.VITE_BACKURL;
      const fetchDataComisiones = await apiFetch(url + `/comision/traerTodas`);
      const jsonDataComisiones = await fetchDataComisiones.json();
      setComisiones(jsonDataComisiones);
    };
    fetchFunction();
  }, []);

  const navigate = useNavigate();

  const limpiarEstadoImagenes = () => {
    // Revocar URLs de memoria
    imagenes.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });
    setImagenes([]);
    setImagenesFiles([]);
  };
  // 🧩 Cargar comisiones
  useEffect(() => {
    limpiarEstadoImagenes();
    const fetchComisiones = async () => {
      const dataComisiones = await fetch(
        `${import.meta.env.VITE_BACKURL}/comision/traerTodas`
      );
      const jsonDataComisiones = await dataComisiones.json();
      setComisiones(jsonDataComisiones);
    };
    fetchComisiones();
  }, []);

  // 🖊️ Handlers
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComunicado({ ...comunicado, [name]: value });
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "tipo_comunicado") {
      setSelectTipoComunicado(e.target.value);
    } else if (e.target.name === "tipo_carrera") {
      setSelectTipoCarrera(e.target.value);
    } else if (e.target.name === "tipo_comision") {
      setSelectComision(Number(e.target.value));
    } else {
      setSelectTipoCarrera("ALL");
      setSelectDivision(Number(e.target.value));
    }
  };

  // 📸 Agregar imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newURLs = files.map((file) => URL.createObjectURL(file));

    setImagenes((prev) => [...prev, ...newURLs]);
    setImagenesFiles((prev) => [...prev, ...files]);
  };

  // 🧩 Reemplazar imagen
  const handleReplaceImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newURL = URL.createObjectURL(file);
    const nuevasImagenes = [...imagenes];
    const nuevasFiles = [...imagenesFiles];

    nuevasImagenes[index] = newURL;
    nuevasFiles[index] = file;

    setImagenes(nuevasImagenes);
    setImagenesFiles(nuevasFiles);
  };

  // ❌ Eliminar imagen
  const handleRemoveImage = (index: number) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
    setImagenesFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 📤 Enviar al backend
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const comunicadoFinal = comunicado;
      const formData = new FormData();

      if (
        comunicadoFinal.titulo.length === 0 ||
        comunicadoFinal.titulo.length > 255
      ) {
        setMensajeError(
          "El título es obligatorio y puede tener un máximo de 255 caracteres"
        );
        return;
      }
      if (comunicadoFinal.descripcion.length === 0) {
        setMensajeError("La descripción es obligatoria");
        return;
      }

      formData.append("id_usuario", comunicado.id_usuario);
      formData.append("titulo", comunicado.titulo);
      formData.append("descripcion", comunicado.descripcion);

      if (selectTipoComunicado === "none") {
        setMensajeError(
          "Es obligatorio seleccionar a quien está dirigido el comunicado"
        );
        return;
      }

      if (selectTipoComunicado === "division" && selectDivision === 0) {
        setMensajeError(
          "Si el comunicado es a nivel División, es obligatorio seleccionar una división en concreto"
        );
        return;
      }

      if (selectTipoComunicado === "comision" && selectComision === 0) {
        setMensajeError(
          "Si el comunicado es a nivel Comisión, es obligatorio seleccionar una comisión en concreto"
        );
        return;
      }

      if (selectTipoComunicado === "general") {
        formData.append("general", "true");
      } else if (selectTipoComunicado === "division") {
        formData.append("division", selectDivision.toString());
        formData.append("carrera", selectTipoCarrera);
      } else if (selectTipoComunicado === "comision") {
        formData.append("id_comision", String(selectComision));
      }

      // Adjuntar imágenes
      imagenesFiles.forEach((file) => {
        formData.append("img", file);
      });

      const url = `${import.meta.env.VITE_BACKURL}/comunicados/crear`;

      await apiFetch(url, { method: "POST", body: formData });

      navigate("/comunicados");
    } catch (err) {
      console.error("Error al crear comunicado:", err);
    }
  };

  // Opciones según rol
  const opcionesExtra =
    rol_usuario === "ADMINISTRADOR" ||
    rol_usuario === "BEDELIA" ||
    rol_usuario === "DIRECTIVO" ? (
      <>
        <option value="general">- General (toda la escuela)</option>
        <option value="division">- División</option>
      </>
    ) : null;

  return (
    <section className="flex flex-col items-center w-full h-full text-black justify-center">
      <div className="bg-white rounded-lg shadow-2xl shadow-gray-700 w-[40%] h-auto items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crear Comunicado
        </h2>
        <h3 className="text-red-500 font-bold mb-4 text-center">
          {mensajeError}
        </h3>
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
              required
            />
          </div>

          {/* Tipo comunicado */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Comunicar a:
            </label>
            <select
              name="tipo_comunicado"
              value={selectTipoComunicado}
              onChange={handleSelect}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              required
            >
              <option value="none">
                Seleccionar quienes deben recibir el comunicado...
              </option>
              {opcionesExtra}
              <option value="comision">- Comisión</option>
            </select>
          </div>

          {/* División */}
          {selectTipoComunicado === "division" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Para qué carrera?
              </label>
              <select
                name="tipo_carrera"
                value={selectTipoCarrera}
                onChange={handleSelect}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                required
              >
                <option value="ALL">- Todas</option>
                <option value="DS">- Programación (DS)</option>
                <option value="AF">- Sistemas (AF)</option>
                <option value="ITI">- Redes y SO (ITI)</option>
              </select>

              <label className="block text-gray-700 font-medium mb-2 mt-3">
                Qué división?
              </label>
              <select
                name="tipo_division"
                value={selectDivision}
                onChange={handleSelect}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                required
              >
                <option value={0}>Seleccionar división...</option>
                <option value={1}>- Primero (1ro)</option>
                <option value={2}>- Segundo (2do)</option>
                <option value={3}>- Tercero (3ro)</option>
              </select>
            </div>
          )}

          {/* Comisión */}
          {selectTipoComunicado === "comision" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Qué comisión?
              </label>
              <select
                name="tipo_comision"
                value={selectComision}
                onChange={handleSelect}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                required
              >
                <option value="none">Seleccionar comisión...</option>
                {comisiones.map((comision) => (
                  <option key={comision.id} value={comision.id}>
                    - {comision.carrera_id} {comision.division_id}º{" "}
                    {comision.numero_comision}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Imágenes */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Imágenes:
            </label>
            {imagenes.length === 0 ? (
              <input
                type="file"
                name="img"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {imagenes.map((imagen, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer rounded-xl overflow-hidden"
                  >
                    <img
                      src={imagen}
                      alt={`imagen-${index}`}
                      className="w-full h-40 object-cover rounded-xl transition-all duration-300 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <label className="cursor-pointer bg-blue-600 p-2 rounded-full text-white flex items-center justify-center">
                        <Pencil size={18} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleReplaceImage(e, index)}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
                {/* Botón para agregar más imágenes */}
                <label className="border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center h-40 text-gray-500 cursor-pointer hover:bg-gray-100">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Crear Comunicado
          </button>
        </form>
      </div>
    </section>
  );
};

export default CrearComunicado;
