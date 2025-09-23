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
        <Route path="/comunicados" element={<Comunicados />} />
        <Route path="/comunicados/crear/:id" element={<CrearComunicado />} />
        <Route path="/carreras" element={<Carreras/>} />
        <Route path="/comisiones" element={<Comisiones/>} />
        <Route path="/materias" element={<Materias/>} />
        <Route path="/unidadcurricular" element={<UnidadCurricular/>} />

      </Routes>
    </Router>
  );
}

export default App;

