// import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
// import Dropdown from "./Dropdown";
import { useLocation } from "react-router-dom";

const Layout = ({ children, User, Logout }) => {
  // const [isMobile, setIsMobile] = useState(null);

  const id = localStorage.getItem("userId");
  const location = useLocation();
  const routeLinks = {
    "/comunicados": [
      {
        name: "Ver Comunicados",
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
        path: `/comunicados?userId=${id}&type=division`,
        rol: ["ESTUDIANTE", "ADMINISTRADOR"],
      },
      {
        name: "Ver comunicados de tu comision",
        path: `/comunicados/comision?userId=${id}&type=comision`,
        rol: ["ESTUDIANTE", "ADMINISTRADOR"],
      },
    ],
    "/carreras": [
      { name: "Ver carreras", path: "/carreras", rol: ["ADMINISTRADOR"] },
    ],
    "/usuarios": [
      { name: "Ver usuarios", path: "/usuarios", rol: ["ADMINISTRADOR"] },
    ],
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
          <main className="flex-grow p-10 ml-60">{children}</main>
        </div>
        <Footer />
      </div>
      {/* )} */}
    </>
  );
};

export default Layout;
