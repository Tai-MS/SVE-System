import { useState } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

interface Comunicado {
  id: number;
  autor: string;
  titulo: string;
  fecha: string;
  contenido: string;
}

export default function Comunicados() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [nuevoComunicado, setNuevoComunicado] = useState<string>('');

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const publicarComunicado = () => {
    if (nuevoComunicado.trim() !== '') {
      const nuevo: Comunicado = {
        id: Date.now(),
        autor: 'Admin',
        titulo: 'Nuevo Comunicado',
        fecha: new Date().toLocaleString(),
        contenido: nuevoComunicado
      };
      setComunicados([nuevo, ...comunicados]);
      setNuevoComunicado('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNuevoComunicado(e.target.value);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-100 p-4">
        <img src="/logoterciario.png" alt="Logo" className="h-12 w-12 rounded-full object-cover" />
        <ul className="space-y-4">
          <li><button className="w-full text-left">Anuncios</button></li>
          <li><button className="w-full text-left">Carreras</button></li>
          <li><button className="w-full text-left">Alumnos</button></li>
          <li>
            <button
              className="w-full text-left flex items-center justify-between"
              onClick={handleClick}
            >
              Mensajes <ArrowDropDown />
            </button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Mensajes Recibidos</MenuItem>
              <MenuItem onClick={handleClose}>Mensajes Enviados</MenuItem>
            </Menu>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h6">Comunicados</Typography>
          <div>
            <Button variant="text" className="mr-2">Principal</Button>
            <Button variant="text" className="mr-2 font-bold">REGENCIA</Button>
            <Button variant="contained" color="inherit">Salir</Button>
          </div>
        </div>

        <div className="mb-6">
          <TextField
            multiline
            fullWidth
            rows={4}
            placeholder="Anuncia algo al alumnado"
            variant="outlined"
            className="bg-white"
            value={nuevoComunicado}
            onChange={handleChange}
          />
          <div className="flex justify-end mt-2">
            <Button variant="contained" color="secondary" onClick={publicarComunicado}>
              Publicar
            </Button>
          </div>
        </div>

        {comunicados.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="flex items-start gap-4">
              <Avatar className="bg-purple-300">{item.autor.charAt(0)}</Avatar>
              <div>
                <Typography variant="subtitle1">{item.titulo}</Typography>
                <Typography variant="caption">{item.fecha}</Typography>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <Typography>{item.contenido}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}