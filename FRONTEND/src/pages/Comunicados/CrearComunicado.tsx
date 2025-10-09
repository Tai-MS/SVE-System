import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Comunicado } from "../../types/ComunicadoTypes";
import type { Usuario } from "../../types/UsuarioTypes";
import type { Comision, Division, Carrera } from "../../types/ComisionesTypes";

const CrearComunicado: React.FC = () => {
  const [comunicado, setComunicado] = useState<Comunicado>({
    id_usuario: localStorage.getItem("userId") || "",
    titulo: "",
    descripcion: "",
    img: [],
    eliminado: false,
  });
  const [usuario, setUsuario] = useState<Usuario>();
  const [comisiones, setComisiones] = useState<Comision>();
  const [selectTipoComunicado, setSelectTipoComunicado] =
    useState<string>("none");
  const [selectTipoCarrera, setSelectTipoCarrera] = useState<string>("none");
  const [selectDivision, setSelectDivision] = useState<number>(0);
  const [selectComision, setSelectComision] = useState<string>("none");

  const id_usuario = localStorage.getItem("userId");
  const rol_usuario = localStorage.getItem("rol");

  useEffect(() => {
    const fetchFunction = async () => {
      const fetchDataUsuario = await fetch(
        `${
          import.meta.env.VITE_BACKURL
        }/usuarios/obtenerUsuario?id=${id_usuario}`
      );
      const jsonDataUsuario = await fetchDataUsuario.json();
      setUsuario(jsonDataUsuario);

      const fetchDataComisiones = await fetch(
        `${import.meta.env.VITE_BACKURL}/comision/traerTodas`
      );
      const jsonDataComisiones = await fetchDataComisiones.json();
      setComisiones(jsonDataComisiones);
      setUsuario(jsonDataComisiones);
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
      console.log(selectTipoCarrera);
    } else if (e.target.name === "tipo_comision") {
      setSelectComision(e.target.value);
    } else {
      setSelectDivision(Number(e.target.value));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_usuario", comunicado.id_usuario);
    formData.append("titulo", comunicado.titulo);
    formData.append("descripcion", comunicado.descripcion);
    if (selectTipoComunicado === "general") {
      formData.append("general", selectTipoComunicado);
    } else if (selectTipoComunicado === "division") {
      formData.append("division", selectDivision.toString());
      formData.append("carrera", selectTipoCarrera);
    } else if (selectTipoComunicado === "comision") {
      formData.append("id_comision", selectComision);
    }
    comunicado.img?.forEach((file) => {
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
    rol_usuario === "ADMINISTRADOR" || rol_usuario === "BEDELÍA" ? (
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
                  <option value="ALL">- Todas</option>
                  <option value="DS">- Programación (DS)</option>
                  <option value="AF">- Sistemas (AF)</option>
                  <option value="ITI">
                    - Redes y Sistemas Operativos (ITI)
                  </option>
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
                  name="tipo_division"
                  id="tipo_division"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                  onChange={handleSelect}
                  required
                >
                  <option value="none">
                    Seleccionar que división va a recibir el comunicado...
                  </option>
                  <option value="1">- Primero (1ro)</option>
                  <option value="2">- Segundo (2do)</option>
                  <option value="3">- Tercero (3ro)</option>
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
                onChange={handleSelect}
                required
              >
                <option value="none">
                  Seleccionar que comisión va a recibir el comunicado...
                </option>
                {comisiones !== undefined &&
                  comisiones.map((comision: Comision) => (
                    <option value={comision.id}>
                      - {comision.carrera_id} {comision.division_id}º
                      {comision.numero_comision}
                    </option>
                  ))}
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
            {comunicado !== undefined && (comunicado.img ?? []).length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {comunicado !== undefined &&
                  (comunicado.img ?? []).map((img, idx) => (
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
