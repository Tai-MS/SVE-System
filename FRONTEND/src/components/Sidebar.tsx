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
      <div className="fixed mt-8 h-full bg-white shadow-md p-10 transition-all duration-500 z-40 shadow-gray-400">
        <nav className="space-y-10">
          {links.map((link: Link, index: number) => {
            if (link.rol && link.rol.includes(usuarioRol as string)) {
              return (
                <NavLink
                  key={index}
                  to={link.path}
                  className="block text-gray-700 hover:text-blue-400"
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
