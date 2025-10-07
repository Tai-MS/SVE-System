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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  anioIngreso: number;
  rol: string;
  activo?: boolean;
}

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Usuario | null>(null);
  const [form, setForm] = useState({ nombre: "", apellido: "", dni: "", telefono: "", email: "", anioIngreso: "", activo: true });

  // 🔹 Traer alumnos al iniciar
  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const obtenerAlumnos = async () => {
    try {
      const res = await fetch("http://localhost:8080/usuarios/obtenerTodos");
      const data = await res.json();

      const estudiantes = data.filter((u: Usuario) => u.rol === "ESTUDIANTE" && u.activo !== false);
      setAlumnos(estudiantes);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
  };

    // dentro de tu componente Alumnos.tsx (reemplaza guardarAlumno y eliminarAlumno)
    const guardarAlumno = async () => {
    try {
        if (editing) {
        const res = await fetch("http://localhost:8080/usuarios/actualizar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editing.id, ...form }),
        });
        const text = await res.text();
        console.log("PUT /usuarios/actualizar status:", res.status, "body:", text);
        if (!res.ok) throw new Error(`Error actualizar: ${res.status} ${text}`);
        } else {
        const res = await fetch("http://localhost:8080/usuarios/crearUsuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, rol: "ESTUDIANTE" }),
        });
        const text = await res.text();
        console.log("POST /usuarios/crearUsuario status:", res.status, "body:", text);
        if (!res.ok) throw new Error(`Error crear: ${res.status} ${text}`);
        }

        setOpen(false);
        setEditing(null);
        setForm({ nombre: "", apellido: "", dni: "", telefono: "", email: "", anioIngreso: "", activo: true });
        obtenerAlumnos();
    } catch (err) {
        console.error("Error al guardar alumno:", err);
        alert("Error al guardar alumno: " + (err as Error).message);
    }
    };

    const eliminarAlumno = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este alumno?")) return;

    try {
        const alumno = alumnos.find((a) => a.id === id);
        if (!alumno) return;
        const res = await fetch("http://localhost:8080/usuarios/actualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...alumno, activo: false }),
        });
        const text = await res.text();
        console.log("PUT /usuarios/actualizar (eliminar) status:", res.status, "body:", text);
        if (!res.ok) throw new Error(`Error eliminar: ${res.status} ${text}`);
        obtenerAlumnos();
    } catch (err) {
        console.error("Error al eliminar alumno:", err);
        alert("Error al eliminar alumno: " + (err as Error).message);
    }
    };


  return (
    <div className="p-6 mt-20 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" className="font-semibold text-purple-700">
          Gestión de Alumnos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={() => {
            setEditing(null);
            setForm({ nombre: "", apellido: "", dni: "", telefono: "", email: "", anioIngreso: "", activo: true });
            setOpen(true);
          }}
        >
          Nuevo Alumno
        </Button>
      </div>

      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-purple-200">
            <TableRow>
              <TableCell><b>Nombre</b></TableCell>
              <TableCell><b>Apellido</b></TableCell>
              <TableCell><b>Dni</b></TableCell>
              <TableCell><b>Teléfono</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Año de ingreso</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.dni}</TableCell>
                <TableCell>{alumno.telefono}</TableCell>
                <TableCell>{alumno.email}</TableCell>
                <TableCell>{alumno.anioIngreso}</TableCell>
                <TableCell>{alumno.activo}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditing(alumno);
                      setForm({
                        nombre: alumno.nombre,
                        apellido: alumno.apellido,
                        dni: alumno.dni,
                        telefono: alumno.telefono,
                        email: alumno.email,
                        anioIngreso: alumno.anioIngreso.toString(),
                        activo: alumno.activo ?? true,
                      });
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => eliminarAlumno(alumno.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo Crear/Editar */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? "Editar Alumno" : "Agregar Nuevo Alumno"}</DialogTitle>
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
            label="Dni"
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
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Año de ingreso"
            value={form.anioIngreso}
            onChange={(e) => setForm({ ...form, anioIngreso: e.target.value })}
          />
          <div className="flex items-center gap-2 mt-2">
            <Typography>Activo</Typography>
            <Button
              variant={form.activo ? "contained" : "outlined"}
              color={form.activo ? "success" : "error"}
              onClick={() => setForm({ ...form, activo: !form.activo })}
            >
              {form.activo ? "Sí" : "No"}
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={guardarAlumno} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
