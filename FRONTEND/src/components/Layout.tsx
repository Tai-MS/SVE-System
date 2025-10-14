// import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
// import Dropdown from "./Dropdown";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Usuario } from "../types/UsuarioTypes";

const Layout = ({ children, User, Logout }) => {
  // const [isMobile, setIsMobile] = useState(null);
  const [usuario, setUsuario] = useState<Usuario>();
  useEffect(() => {
    const fetchFunction = async () => {
      const id_usuario = localStorage.getItem("userId");
      const data = await fetch(
        `${
          import.meta.env.VITE_BACKURL
        }/usuarios/obtenerUsuario?id=${id_usuario}`
      );
      const dataJson = await data.json();
      setUsuario(dataJson);
      console.log(dataJson);
    };

    fetchFunction();
  }, []);
  const location = useLocation();
  const routeLinks = {
    "/comunicados": [
      {
        name: "Ver Comunicados generales",
        path: "/comunicados",
        rol: [
          "ESTUDIANTE",
          "PROFESOR",
          "BEDELIA",
          "DIRECTIVO",
          "ADMINISTRADOR",
        ],
      },
      {
        name: "Agregar Comunicado",
        path: "/comunicados/crear",
        rol: ["PROFESOR", "BEDELIA", "DIRECTIVO", "ADMINISTRADOR"],
      },
      {
        name: "Ver comunicados de tu divison",
        path: `/comunicados?idUser=${usuario?.id}&type=division&career=${usuario?.carrera_id_fk}`,
        rol: ["ESTUDIANTE", "ADMINISTRADOR"],
      },
      {
        name: "Ver comunicados de tu comision",
        path: `/comunicados?idUser=${usuario?.id}&type=comision`,
        rol: ["ESTUDIANTE", "ADMINISTRADOR"],
      },
    ],
    "/carreras": [
      { name: "Ver carreras", path: "/carreras", rol: ["ADMINISTRADOR"] },
    ],
    "/usuarios": [
      { name: "Ver usuarios", path: "/usuarios", rol: ["ADMINISTRADOR", "BEDELIA", "DIRECTIVO"] },
    ],
    "/UC": [
      { name: "Ver UCs", path: "/UC", rol: ["PROFESOR", "BEDELIA", "DIRECTIVO", "ADMINISTRADOR", "ESTUDIANTE"] },
      { name: "Agregar UCs", path: "/UC", rol: ["BEDELIA", "DIRECTIVO", "ADMINISTRADOR"] },
      { name: "Eliminar UCs", path: "/UC", rol: ["BEDELIA", "DIRECTIVO", "ADMINISTRADOR"] },
    ]
  };

  const currentBasePath = `/${location.pathname.split("/")[1]}`;
  const links = routeLinks[currentBasePath] || [];

  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.matchMedia("(max-width: 640px)").matches);
  //   };

  //   checkMobile();

  //   window.addEventListener("resize", checkMobile);

  //   return () => window.removeEventListener("resize", checkMobile);
  // }, []);

  return (
    <>
      {/* {isMobile ? (
        <main className="flex flex-col">
          <Dropdown links={finalLinks} />
          <div className="mt-16">{children}</div>
          <Footer />
        </main>
      ) : ( */}
      <div className="flex flex-col min-h-screen">
        <Header user={User} onLogout={Logout} />
        <div className="flex flex-grow mt-16">
          <Sidebar links={links} />
          <main className="flex-grow p-10 ml-80">{children}</main>
        </div>
        <Footer />
      </div>
      {/* )} */}
    </>
  );
};

export default Layout;
