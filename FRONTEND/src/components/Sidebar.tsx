// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
//   Collapse,
// } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import type { Link } from "../types/UsuarioTypes";

const Sidebar = ({ links }) => {
  // const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const usuarioRol = localStorage.getItem("rol");

  return (
    <>
      <div className="fixed mt-8 h-full w-60 bg-white shadow-md pt-10 transition-all duration-500 z-40 shadow-gray-400">
        <nav className="flex flex-col space-y-10 justify-center items-center">
          {links != undefined &&
            links.map((link: Link, index: number) => {
              if (link.rol.includes(usuarioRol as string)) {
                return (
                  <NavLink
                    key={index}
                    to={link.path}
                    className="block text-gray-700 hover:text-blue-400 max-w-40"
                  >
                    {link.name}
                  </NavLink>
                );
              } else {
                return null;
              }
            })}
        </nav>
      </div>
      {/* Sidebar
      <aside className="w-60 bg-purple-50 p-4 flex flex-col gap-2">
        <img
          src="/logoterciario.png"
          alt="Logo"
          className="w-12 h-12 mb-4 mx-auto"
        />
        <List className="text-left cursor-pointer px-3 py-2 rounded-md font-medium">
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemText
                primary="Anuncios"
                className={"bg-white text-purple-600 shadow-md"}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/carreras")}>
              <ListItemText
                primary="Carreras"
                className={"text-gray-700 hover:bg-purple-100"}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary="Alumnos"
                className={"text-gray-700 hover:bg-purple-100"}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemText
                primary="Mensajes"
                className={"text-gray-700 hover:bg-purple-100"}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    primary="Recibidos"
                    className={"text-gray-700 hover:bg-purple-100"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    primary="Enviados"
                    className={"text-gray-700 hover:bg-purple-100"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </aside> */}
    </>
  );
};

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
