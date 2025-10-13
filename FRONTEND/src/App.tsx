import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UC from "./pages/UC/UC";
import Carreras from "./components/Carreras";
import Alumnos from "./components/Alumnos";
import Comisiones from "./components/Comisiones";
import Materias from "./components/Materias";
import UnidadCurricular from "./components/UnidadCurricular";
import Layout from "./components/Layout";
import Comunicados from "./pages/Comunicados/Comunicados";
import CrearComunicado from "./pages/Comunicados/CrearComunicado";

function App() {
  const { user, logout, login } = useAuth();

  return (
    <Router>
      <Routes>

        <Route 
          path="/login" 
          element={<Login login={login} />}  
          />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout User={user} Logout={logout}>
                <Routes>
                  <Route path="/comunicados" element={<Comunicados />} />
                  <Route
                    path="/comunicados/crear"
                    element={<CrearComunicado />}
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
                  <Route 
                    path="/uc" 
                    element={<UC />}
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
