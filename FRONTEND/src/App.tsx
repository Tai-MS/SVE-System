import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Header from "./components/Header";
import Comunicados from "./pages/Comunicados/Comunicados";
import CrearComunicado from "./pages/Comunicados/CrearComunicado";
import Carreras from "./components/Carreras";
import Comisiones from "./components/Comisiones";
import Materias from "./components/Materias";
import UnidadCurricular from "./components/UnidadCurricular";

function App() {
  const { user, logout, login } = useAuth();

  return (
    <Router>
      <Header user={user} onLogout={logout} />
      <Routes>
        <Route path="/login" element={<Login login={login} />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/comunicados" element={<ProtectedRoute><Comunicados /></ProtectedRoute>} />
        <Route path="/comunicados/crear/:id" element={<ProtectedRoute><CrearComunicado /></ProtectedRoute>} />
        <Route path="/carreras" element={<ProtectedRoute><Carreras /></ProtectedRoute>} />
        <Route path="/comisiones/:carreraId" element={<ProtectedRoute><Comisiones /></ProtectedRoute>} />
        <Route path="/materias/:comisionId" element={<ProtectedRoute><Materias /></ProtectedRoute>} />
        <Route path="/unidadcurricular/:materiaId/:materiaNombre/:materiaProfe" element={<ProtectedRoute><UnidadCurricular /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;

