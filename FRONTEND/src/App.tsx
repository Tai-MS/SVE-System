import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Carreras from "./components/Carreras";
import Alumnos from "./components/Alumnos";
import Comisiones from "./components/Comisiones";
import Materias from "./components/Materias";
import UnidadCurricular from "./components/UnidadCurricular";
import Layout from "./components/Layout";
import Comunicados from "./pages/Comunicados/Comunicados";
import CrearComunicado from "./pages/Comunicados/CrearComunicado";
import Home from "./pages/Home/Home";
import MisComunicados from "./pages/Comunicados/MisComunicados";
import DetallesComunicado from "./pages/Comunicados/DetallesComunicado";

function App() {
  const { user, logout, login } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout User={user} Logout={logout}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/comunicados" element={<Comunicados />} />
                  <Route
                    path="/comunicados/misComunicados/:idUser"
                    element={<MisComunicados />}
                  />
                  <Route
                    path="/comunicados/crear"
                    element={<CrearComunicado />}
                  />
                  <Route
                    path="/comunicados/detalles/:idUser"
                    element={<DetallesComunicado />}
                  />
                  <Route path="/carreras" element={<Carreras />} />
                  <Route path="/usuarios" element={<Alumnos />} />
                  <Route
                    path="/comisiones/:carreraId"
                    element={<Comisiones />}
                  />
                  <Route path="/materias/:comisionId" element={<Materias />} />
                  <Route
                    path="/unidadcurricular/:materiaId/:materiaNombre/:materiaProfe"
                    element={<UnidadCurricular />}
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
