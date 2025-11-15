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
} from "@mui/material";
import CheckBox from "@mui/material/Button";
import { Add, Edit } from "@mui/icons-material";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  anioIngreso: number;
  rol: string;
  activo: boolean;
  token: string;
  carrera_id_fk: string | null;
  division_id?: number | null;
  numero_comision?: string | null;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [rolActivo, setRolActivo] = useState<
    "ESTUDIANTE" | "PROFESOR" | "BEDELIA" | "DIRECTIVO"
  >("ESTUDIANTE");
  const [busqueda, setBusqueda] = useState("");
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
    division_id: "",
    numero_comision: "",
  });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKURL + "/usuarios/obtenerTodos"
      );
      const data = await res.json();
      setUsuarios(data);
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
        division_id: form.rol === "ESTUDIANTE" ? form.division_id : null,
        numero_comision:
          form.rol === "ESTUDIANTE" ? form.numero_comision : null,
      };

      let res: Response;
      if (editing) {
        res = await fetch(
          import.meta.env.VITE_BACKURL + "/usuarios/actualizar",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token") || "",
            },
            body: JSON.stringify({
              id: editing.id,
              ...body,
            }),
          }
        );
      } else {
        res = await fetch(
          import.meta.env.VITE_BACKURL + "/usuarios/crearUsuario",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
      }

      const text = await res.text();
      console.log("Guardar usuario status:", res.status, "body:", text);
      if (!res.ok) throw new Error(`Error guardar: ${res.status} ${text}`);

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
        division_id: "",
        numero_comision: "",
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
      <Typography variant="h5" className="font-semibold text-purple-700 mb-4">
        Gestión de Usuarios
      </Typography>

      {/* 🔹 Tabs de roles */}
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

      {/* 🔹 Filtros y botones */}
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

                  const formData = new FormData();
                  formData.append("file", file);

                  try {
                    const res = await fetch(
                      import.meta.env.VITE_BACKURL +
                        "/usuarios/importarAlumnos",
                      {
                        method: "POST",
                        body: formData,
                      }
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
                      obtenerUsuarios();
                    } else {
                      alert("Error al importar: " + text);
                    }
                  } catch (err) {
                    console.error("Error al importar:", err);
                    alert("Error al importar el archivo");
                  }

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
                division_id: "",
                numero_comision: "",
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
                <>
                  <TableCell>
                    <b>Carrera</b>
                  </TableCell>
                  <TableCell>
                    <b>División</b>
                  </TableCell>
                  <TableCell>
                    <b>Comisión</b>
                  </TableCell>
                </>
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
                  <>
                    <TableCell>
                      {usuario.carrera_id_fk?.toUpperCase() ?? "-"}
                    </TableCell>
                    <TableCell>{usuario.division_id ?? "-"}</TableCell>
                    <TableCell>{usuario.numero_comision ?? "-"}</TableCell>
                  </>
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
                        division_id: usuario.division_id?.toString() ?? "",
                        numero_comision: usuario.numero_comision ?? "",
                      });
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {usuariosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Diálogo Crear/Editar */}
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

          {/* 🔹 Mostrar select de Carrera SOLO si es estudiante */}
          {form.rol === "ESTUDIANTE" && (
            <>
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

              <TextField
                select
                label="División"
                value={form.division_id}
                onChange={(e) =>
                  setForm({ ...form, division_id: e.target.value })
                }
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </TextField>

              <TextField
                select
                label="Comisión"
                value={form.numero_comision}
                onChange={(e) =>
                  setForm({ ...form, numero_comision: e.target.value })
                }
              >
                <MenuItem value="1ro">1ro</MenuItem>
                <MenuItem value="2da">2da</MenuItem>
                <MenuItem value="3ra">3ra</MenuItem>
              </TextField>
            </>
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
