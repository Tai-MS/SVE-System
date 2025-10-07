import {useState} from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


export default function Sidebar() {
    const [open, setOpen] = useState(false);
      
    return (
        <>
        <aside className="mt-20 pt-10 w-64 h-screen bg-gray-400/20 p-2 text-black shadow-lg fixed z-10">
        
        <List>
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemText primary="Anuncios" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Unidades Curriculares" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Alumnos" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemText primary="Mensajes" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Recibidos" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Enviados" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </aside>
    </>
    );
}