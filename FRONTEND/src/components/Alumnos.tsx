import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tabs,
  Tab,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CheckBox from "@mui/material/Button";
import { Add, Edit } from "@mui/icons-material";
import { apiFetch } from "../hooks/validarToken";

const MATERIAS = {
  DS: [
    {
      id: "7e3e1c1c-6b4f-4d8f-8a6b-4c2d7e41c5c1",
      nombre: "Comunicación",
      carrera: "DS",
      carga_horaria: 48,
      tipo_uc: "TALLER",
    },
    {
      id: "3fbcd625-b530-4fc0-b1eb-6b6ed0b869be",
      nombre: "UDI 1",
      carrera: "DS",
      carga_horaria: 48,
      tipo_uc: "TALLER",
    },
    {
      id: "5725da3f-4982-4b77-8cc3-a7e0df48a0c1",
      nombre: "Matemática",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "abf0d829-b1d2-4c35-8ee2-b89c9b4d6f18",
      nombre: "Inglés Técnico 1",
      carrera: "DS",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "13eaf6df-17e4-44b7-a644-bea4bdf65084",
      nombre: "Administración",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "57b2026d-a9b8-4df4-a961-6499b4a5b0f3",
      nombre: "Tecnología de la Información",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "b6452751-e081-4d76-89ed-51450a64c6b9",
      nombre: "Lógica y Estructura de Datos",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "c52e55c7-89e9-4b34-bceb-e14f5dd9c1d5",
      nombre: "Ingeniería de Software",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "6c415133-cab4-4618-8c42-9c685a3beb3b",
      nombre: "Sistemas Operativos",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "ae174c1b-298c-4eb1-8058-0b3b59ce47c4",
      nombre: "Problemáticas Socio Contemporáneas",
      carrera: "DS",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "a05fddd2-5ef2-4cc6-9a20-47f6579717f0",
      nombre: "UDI 2",
      carrera: "DS",
      carga_horaria: 48,
      tipo_uc: "TALLER",
    },
    {
      id: "a57a8f38-2ab7-4cb7-b035-8d235dae6bd2",
      nombre: "Inglés Técnico 2",
      carrera: "DS",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "2f28eeab-f455-4c7e-b8b6-7d54385dc9b2",
      nombre: "Innovación y Desarrollo Emprendedor",
      carrera: "DS",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "4d72c776-8129-4fc5-9a7a-02799004f43b",
      nombre: "Estadística",
      carrera: "DS",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "9a6630c9-10e7-41b7-ba47-20be0bb5e5e7",
      nombre: "Programación 1",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "45e54f82-3241-4f3e-980d-8fe95383b263",
      nombre: "Ingeniería de Software 2",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "4962c970-eb1b-4ec2-b770-e14b4e43c070",
      nombre: "Bases de Datos 1",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "7fc01e25-4cbd-409b-b5c2-49d021eb90e0",
      nombre: "Práctica Profesionalizante 1",
      carrera: "DS",
      carga_horaria: 192,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
    {
      id: "60e3896f-7bc2-463e-8574-4ea40a5067dd",
      nombre: "Ética y Responsabilidad",
      carrera: "DS",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "21f09a4a-d0bc-4419-a63c-45c9d4a9b9d3",
      nombre: "Derecho y Legislación Laboral",
      carrera: "DS",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "aa8ffa3f-476e-4eb8-a9b2-dfd2b4a92314",
      nombre: "Redes y Comunicación",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "LABORATORIO",
    },
    {
      id: "c3da0685-8571-4263-baf6-5a6bdf2481c7",
      nombre: "Programación 2",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "0bdb9808-8af8-4d1b-b0b6-aaf3a6dacc32",
      nombre: "Gestión de PRACTICA PROFESIONALIZANTEs de Software",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "b6317275-a84c-4488-a5d7-1b07efac5bc0",
      nombre: "Bases de Datos 2",
      carrera: "DS",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "e08a37e5-d0fc-46b8-9c38-b3bb3bf0b7cb",
      nombre: "Práctica Profesionalizante 2",
      carrera: "DS",
      carga_horaria: 192,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
  ],
  ITI: [
    {
      id: "65172fb0-d932-4bc4-8fe0-bc682f92cbea",
      nombre: "Comunicación",
      carrera: "ITI",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "bb13d80a-63d2-4ff3-96ba-0f1a87a2935c",
      nombre: "UDI 1",
      carrera: "ITI",
      carga_horaria: 48,
      tipo_uc: "TALLER",
    },
    {
      id: "d98d8530-e714-44d1-9b5b-00dd7c6d9b42",
      nombre: "Matemática",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "43af9531-dba1-47c6-a2c3-b5b5efa3ce56",
      nombre: "Física Aplicada a las Tecnologías de la Información",
      carrera: "ITI",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "e5ece97a-7a79-4be5-afc8-48f9b5f96d1b",
      nombre: "Administración",
      carrera: "ITI",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "289107cc-4f3a-4937-845f-38f939ca4b45",
      nombre: "Inglés Técnico",
      carrera: "ITI",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "57bfd671-8919-4a68-8177-9c86b6e6b57b",
      nombre: "Arquitectura de las Computadoras",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "4b7f23ab-f2a8-440c-91e9-584fd83c7cb0",
      nombre: "Lógica y Programación",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "53db013c-2068-4a03-b80d-9e6bbf47cadd",
      nombre: "Infraestructura de Redes 1",
      carrera: "ITI",
      carga_horaria: 64,
      tipo_uc: "MATERIA",
    },
    {
      id: "cb68fe8f-f183-4a35-babd-b85b7be35ae2",
      nombre: "Problemáticas Socio Contemporáneas",
      carrera: "ITI",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "11123a7f-309a-4fbd-8b50-daa6dcf4660a",
      nombre: "UDI 2",
      carrera: "ITI",
      carga_horaria: 48,
      tipo_uc: "TALLER",
    },
    {
      id: "4fb30608-360c-45c6-8599-56fa6cf96ca0",
      nombre: "Estadística",
      carrera: "ITI",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "54ec2f63-ef36-4d0d-8034-d907612e33db",
      nombre: "Innovación y Desarrollo Emprendedor",
      carrera: "ITI",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "10b312a1-9d06-4c4b-aa5d-dc6c7c4b81e3",
      nombre: "Sistemas Operativos",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "9ad65a87-bdf3-4d1a-ae59-02be86b9c7a4",
      nombre: "Algoritmos y Estructura de Datos",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "48a98feb-1c94-4eb7-a12b-5a271b0d47ea",
      nombre: "Bases de Datos 1",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "be5b8bdf-e0a4-4d5b-8548-c680d85d1dee",
      nombre: "Infraestructura de Redes 2",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "LABORATORIO",
    },
    {
      id: "e503210b-8e65-4f23-9dd8-712e26dfc6cc",
      nombre: "Práctica Profesionalizante 1",
      carrera: "ITI",
      carga_horaria: 192,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
    {
      id: "27b95b6c-3b7f-4d4f-b842-a8b3d4727571",
      nombre: "Ética y Responsabilid",
      carrera: "ITI",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "4b627f59-e5cd-49eb-9168-b3af0a5b33d7",
      nombre: "Derecho y Legislación Laboral",
      carrera: "ITI",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "45e0a71d-9e39-46d3-a4a8-a86e9c6908e4",
      nombre: "Administración de Bases de Datos",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "2710c6cc-8148-4fd1-ac35-5d217691815c",
      nombre: "Seguridad Sistemas",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "572545b7-6fbd-4f1f-b75f-4e6cac0f4b4e",
      nombre: "Integridadción de Datos",
      carrera: "ITI",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "5c4c02d3-fbcf-4e8e-9eed-1f482d2b03e8",
      nombre: "Administración de Sistemas Operativos y Redes",
      carrera: "ITI",
      carga_horaria: 128,
      tipo_uc: "MATERIA",
    },
    {
      id: "bdc3a8cf-5adf-405b-a96f-96d0fba9f3dc",
      nombre: "Práctica Profesionalizante 2",
      carrera: "ITI",
      carga_horaria: 256,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
  ],
  AF: [
    {
      id: "b4bcf036-b910-415b-9810-4b3c1631ed45",
      nombre: "Comunicación",
      carrera: "AF",
      carga_horaria: 48,
      tipo_uc: "TALLER",
    },
    {
      id: "cf5f6bfd-0edf-4d43-bbb8-64b3800bd85e",
      nombre: "UDI 1",
      carrera: "AF",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "b0b36fc9-3671-4be1-9d14-43fda9e90227",
      nombre: "Matemática",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "5c4e9f72-8394-4fbc-aa40-b32e03fde3d8",
      nombre: "Inglés Técnico 1",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "f78916b0-3ef0-4f25-9a91-3b7a4f25c45f",
      nombre: "Psicosociología de las Organizaciones",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "9023d572-8040-4c3c-830e-0dbded6dfd18",
      nombre: "Modelos de Negocios",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "TALLER",
    },
    {
      id: "14c3c299-8d81-4b82-ae70-f5e516a70c48",
      nombre: "Arquitectura de las Computadoras",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "TALLER",
    },
    {
      id: "a54146b5-41d1-4c28-ad04-fcd41c2b4c7b",
      nombre: "Gestión de Software",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "TALLER",
    },
    {
      id: "36dfb26d-b018-44a8-b05e-040d136c27f6",
      nombre: "Análisis de Sistemas Organizacionales",
      carrera: "AF",
      carga_horaria: 160,
      tipo_uc: "TALLER",
    },
    {
      id: "0a9f4502-3603-4aa5-9d52-83e632ee4e5c",
      nombre: "Problemáticas Socio Contemporáneas",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "fd48a993-93a5-483d-ba7f-bc0a2c7d4194",
      nombre: "UDI 2",
      carrera: "AF",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "c6d4be8e-56ad-4877-9aec-740d79134d5f",
      nombre: "Inglés Técnico 2",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "d102c427-9184-4f6e-a4f1-ebc58660dbef",
      nombre: "Estadística",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "c05eb5d4-27b9-4e14-9483-c79027e53ad8",
      nombre: "Innovación y Desarrollo Emprendedor",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "TALLER",
    },
    {
      id: "341f7c1e-6a18-4118-b400-25c69b08f75d",
      nombre: "Gestión de Software 2",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "TALLER",
    },
    {
      id: "3c8834f9-f0ba-409d-a634-5a422ff0e8f3",
      nombre: "Estrategias de Negocios",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
    {
      id: "fa4a2c37-1388-4e7a-99ce-0da68e9a7ea3",
      nombre: "Desarrollo de Sistemas",
      carrera: "AF",
      carga_horaria: 160,
      tipo_uc: "TALLER",
    },
    {
      id: "f09f67f1-a870-4068-8a3c-c8ae77ae41cf",
      nombre: "Práctica Profesionalizante 1",
      carrera: "AF",
      carga_horaria: 192,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
    {
      id: "2d5af7fe-6d8c-4ddf-bc87-3cc04a768ec5",
      nombre: "Ética y Responsabilidad",
      carrera: "AF",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "b1bd55b1-dfcf-4e23-b91f-43416f2b61a0",
      nombre: "Derecho y Legislación Laboral",
      carrera: "AF",
      carga_horaria: 48,
      tipo_uc: "MATERIA",
    },
    {
      id: "1dcafcf0-1bb0-438d-9dbe-9ae623afec68",
      nombre: "Redes y Comunicaciones",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "LABORATORIO",
    },
    {
      id: "272c6aa8-f1e6-4477-8b38-e2fa88cc8d75",
      nombre: "Seguridad Sistemas",
      carrera: "AF",
      carga_horaria: 96,
      tipo_uc: "MATERIA",
    },
    {
      id: "7f16cce0-bffe-4f63-8d07-d653ce26c4b0",
      nombre: "Bases de Datos",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "TALLER",
    },
    {
      id: "b1bf7018-708f-48a7-89ff-75d8f9d94f45",
      nombre: "Sistema de Información Organizacional",
      carrera: "AF",
      carga_horaria: 128,
      tipo_uc: "TALLER",
    },
    {
      id: "0b28df52-48a3-4d07-9d34-8620ffba6048",
      nombre: "Desarrollo de Sistemas Web",
      carrera: "AF",
      carga_horaria: 160,
      tipo_uc: "TALLER",
    },
    {
      id: "fb0f9fa7-b166-4ef2-ab97-61a92052f60e",
      nombre: "Práctica Profesionalizante 2",
      carrera: "AF",
      carga_horaria: 192,
      tipo_uc: "PRACTICA PROFESIONALIZANTE",
    },
  ],
};

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  anioIngreso: number;
  rol: "ESTUDIANTE" | "PROFESOR" | "BEDELIA" | "DIRECTIVO";
  activo: boolean;
  token: string;
  carrera_id_fk: string | null;
  materias?: string[];
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [materiasUsuarios, setMateriasUsuarios] = useState<{
    [id: number]: { id: string; division: number }[];
  }>({});
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [rolActivo, setRolActivo] = useState<
    "ESTUDIANTE" | "PROFESOR" | "BEDELIA" | "DIRECTIVO"
  >("ESTUDIANTE");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    anioIngreso: "",
    rol: "ESTUDIANTE",
    activo: true,
    token: localStorage.getItem("token"),
    carrera_id_fk: "",
    materias: [] as { id: string; division: number }[],
  });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await apiFetch(
        import.meta.env.VITE_BACKURL + "/usuarios/obtenerTodos"
      );
      const data = await res.json();
      setUsuarios(data);
      const materiasMap: { [id: number]: { id: string; division: number }[] } =
        {};
      data.forEach((u: Usuario) => {
        if (u.rol === "PROFESOR") {
          materiasMap[u.id] = (u.materias ?? []).map((id) => ({
            id,
            division: 1,
          }));
        }
      });
      setMateriasUsuarios(materiasMap);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const guardarUsuario = async () => {
    try {
      const body = {
        ...form,
        carrera_id_fk:
          form.rol === "ESTUDIANTE" && form.carrera_id_fk
            ? form.carrera_id_fk.toUpperCase()
            : null,
      };

      if (editing) {
        await fetch(import.meta.env.VITE_BACKURL + "/usuarios/actualizar", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token") || "",
          },
          body: JSON.stringify({
            id: editing.id,
            ...body,
          }),
        });
      } else {
        const res = await apiFetch(
          import.meta.env.VITE_BACKURL + "/usuarios/crearUsuario",
          form
        );

        const text = await res.text();
        if (!res.ok) throw new Error(`Error crear: ${res.status} ${text}`);
      }

      setOpen(false);
      setEditing(null);
      setForm({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        email: "",
        anioIngreso: "",
        rol: rolActivo,
        activo: true,
        token: localStorage.getItem("token"),
        carrera_id_fk: "",
        materias: [],
      });
      obtenerUsuarios();
    } catch (err) {
      console.error("Error al guardar usuario:", err);
      alert("Error al guardar usuario: " + (err as Error).message);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideRol = u.rol === rolActivo && u.activo !== false;
    const termino = busqueda.toLowerCase();
    const coincideBusqueda =
      (u.nombre?.toLowerCase() ?? "").includes(termino) ||
      (u.apellido?.toLowerCase() ?? "").includes(termino) ||
      (u.dni?.toLowerCase() ?? "").includes(termino) ||
      (u.telefono?.toLowerCase() ?? "").includes(termino) ||
      (u.anioIngreso?.toString().toLowerCase() ?? "").includes(termino) ||
      (u.carrera_id_fk?.toLowerCase() ?? "").includes(termino);
    return coincideRol && coincideBusqueda;
  });

  return (
    <div className="p-3 mt-10 bg-white rounded-lg shadow-md">
      {cargando && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "white",
            fontSize: "1.3rem",
            backdropFilter: "blur(3px)",
          }}
        >
          <CircularProgress size={65} thickness={5} />
          <div style={{ marginTop: "15px" }}>Importando usuarios...</div>
        </div>
      )}

      <Typography variant="h5" className="font-semibold text-purple-700 mb-4">
        Gestión de Usuarios
      </Typography>

      <Tabs
        value={rolActivo}
        onChange={(_, nuevoRol) => {
          setRolActivo(nuevoRol);
          setBusqueda("");
        }}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label="Estudiantes" value="ESTUDIANTE" />
        <Tab label="Profesores" value="PROFESOR" />
        {(localStorage.getItem("rol") === "DIRECTIVO" ||
          localStorage.getItem("rol") === "ADMINISTRADOR") && (
          <Tab label="Bedelía" value="BEDELIA" />
        )}
        {(localStorage.getItem("rol") === "DIRECTIVO" ||
          localStorage.getItem("rol") === "ADMINISTRADOR") && (
          <Tab label="Directivos" value="DIRECTIVO" />
        )}
      </Tabs>

      {/* 🔹 Filtros + Botones */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4 mb-3">
        <TextField
          label={`Buscar ${rolActivo}`}
          variant="outlined"
          size="small"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "250px" }}
        />

        <div className="flex gap-3">
          {rolActivo === "ESTUDIANTE" && (
            <>
              <input
                id="fileInput"
                type="file"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setCargando(true);

                  const formData = new FormData();
                  formData.append("file", file);

                  try {
                    const res = await apiFetch(
                      import.meta.env.VITE_BACKURL +
                        "/usuarios/importarAlumnos",
                      formData
                    );

                    const text = await res.text();
                    console.log(
                      "POST /usuarios/importarAlumnos status:",
                      res.status,
                      "body:",
                      text
                    );

                    if (res.ok) {
                      alert("Usuarios importados correctamente ✅");
                      await obtenerUsuarios();
                    } else {
                      alert("Error al importar: " + text);
                    }
                  } catch (err) {
                    console.error("Error al importar:", err);
                    alert("Error al importar el archivo");
                  }

                  setCargando(false);
                  e.target.value = "";
                }}
              />

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Importar Excel de Estudiantes
              </Button>
            </>
          )}

          <Button
            variant="contained"
            startIcon={<Add />}
            color="primary"
            onClick={() => {
              setEditing(null);
              setForm({
                nombre: "",
                apellido: "",
                dni: "",
                telefono: "",
                email: "",
                anioIngreso: "",
                rol: rolActivo,
                activo: true,
                token: localStorage.getItem("token"),
                carrera_id_fk: "",
                materias: [],
              });
              setOpen(true);
            }}
          >
            Nuevo {rolActivo}
          </Button>
        </div>
      </div>

      {/* 🔹 Tabla */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-purple-200">
            <TableRow>
              <TableCell>
                <b>Nombre</b>
              </TableCell>
              <TableCell>
                <b>Apellido</b>
              </TableCell>
              <TableCell>
                <b>DNI</b>
              </TableCell>
              <TableCell>
                <b>Teléfono</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Año de ingreso</b>
              </TableCell>
              <TableCell>
                <b>Activo</b>
              </TableCell>
              {rolActivo === "ESTUDIANTE" && (
                <TableCell>
                  <b>Carrera</b>
                </TableCell>
              )}
              {rolActivo === "PROFESOR" && (
                <TableCell>
                  <b>Materias</b>
                </TableCell>
              )}
              <TableCell>
                <b>Acciones</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosFiltrados.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.dni}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.anioIngreso}</TableCell>
                <TableCell>{usuario.activo ? "Sí" : "No"}</TableCell>
                {rolActivo === "ESTUDIANTE" && (
                  <TableCell>
                    {usuario.carrera_id_fk?.toUpperCase() ?? "-"}
                  </TableCell>
                )}
                {rolActivo === "PROFESOR" && (
                  <TableCell>
                    {(materiasUsuarios[usuario.id] || [])
                      .map((m) => {
                        const mat = Object.values(MATERIAS)
                          .flat()
                          .find((mat) => mat.id === m.id);
                        return mat
                          ? `${mat.nombre} (${mat.carrera}, Div${m.division})`
                          : "";
                      })
                      .join(", ")}
                  </TableCell>
                )}
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditing(usuario);
                      setForm({
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        dni: usuario.dni,
                        telefono: usuario.telefono,
                        email: usuario.email,
                        anioIngreso: usuario.anioIngreso.toString(),
                        rol: usuario.rol,
                        activo: usuario.activo ?? true,
                        token: localStorage.getItem("token"),
                        carrera_id_fk: usuario.carrera_id_fk ?? "",
                        materias: materiasUsuarios[usuario.id]
                          ? [...materiasUsuarios[usuario.id]]
                          : [],
                      });
                      setOpen(true);
                      setMateriaSeleccionada("");
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {usuariosFiltrados.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={rolActivo === "PROFESOR" ? 9 : 8}
                  align="center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Dialog Crear/Editar */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editing ? "Editar Usuario" : "Agregar Nuevo Usuario"}
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 mt-2">
          <TextField
            label="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <TextField
            label="Apellido"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
          />
          <TextField
            label="DNI"
            value={form.dni}
            onChange={(e) => setForm({ ...form, dni: e.target.value })}
          />
          <TextField
            label="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            disabled
            helperText="El email no puede ser modificado"
          />
          <TextField
            label="Año de ingreso"
            value={form.anioIngreso}
            onChange={(e) => setForm({ ...form, anioIngreso: e.target.value })}
          />

          {form.rol === "ESTUDIANTE" && (
            <TextField
              select
              label="Carrera"
              value={form.carrera_id_fk}
              onChange={(e) =>
                setForm({
                  ...form,
                  carrera_id_fk: e.target.value.toUpperCase(),
                })
              }
            >
              <MenuItem value="DS">DS</MenuItem>
              <MenuItem value="ITI">ITI</MenuItem>
              <MenuItem value="AF">AF</MenuItem>
            </TextField>
          )}

          {form.rol === "PROFESOR" && (
            <div className="flex flex-col gap-2">
              {/* Selección de materias */}
              <TextField
                select
                label="Agregar Materia"
                value={materiaSeleccionada}
                onChange={(e) => {
                  const id = e.target.value;
                  if (!form.materias.find((m) => m.id === id)) {
                    setForm({
                      ...form,
                      materias: [...form.materias, { id, division: 1 }],
                    });
                  }
                  setMateriaSeleccionada("");
                }}
              >
                {Object.values(MATERIAS)
                  .flat()
                  .map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.nombre} ({m.tipo_uc}) - {m.carrera}
                    </MenuItem>
                  ))}
              </TextField>

              {/* Listado de materias seleccionadas con división */}
              {form.materias.map((m, idx) => {
                const materia = Object.values(MATERIAS)
                  .flat()
                  .find((mat) => mat.id === m.id);
                if (!materia) return null;
                return (
                  <div key={m.id} className="flex items-center gap-2">
                    <Typography>
                      {materia.nombre} ({materia.carrera})
                    </Typography>
                    <TextField
                      select
                      size="small"
                      label="División"
                      value={m.division}
                      onChange={(e) => {
                        const division = Number(e.target.value);
                        setForm({
                          ...form,
                          materias: form.materias.map((mat, i) =>
                            i === idx ? { ...mat, division } : mat
                          ),
                        });
                      }}
                      style={{ width: "100px" }}
                    >
                      {[1, 2, 3].map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      color="error"
                      onClick={() => {
                        setForm({
                          ...form,
                          materias: form.materias.filter((_, i) => i !== idx),
                        });
                      }}
                    >
                      Quitar
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <Typography>Activo</Typography>
            <CheckBox
              variant={form.activo ? "contained" : "outlined"}
              color={form.activo ? "success" : "error"}
              onClick={() => setForm({ ...form, activo: !form.activo })}
            >
              {form.activo ? "Sí" : "No"}
            </CheckBox>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={guardarUsuario} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
