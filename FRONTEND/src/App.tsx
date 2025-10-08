import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Materias from "./components/Materias";
import UnidadCurricular from "./components/UnidadCurricular";
import Home from "./pages/Home/Home";

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
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/materias/:comisionId" element={<ProtectedRoute><Materias /></ProtectedRoute>} />
        <Route path="/unidadcurricular/:materiaId/:materiaNombre/:materiaProfe" element={<ProtectedRoute><UnidadCurricular /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;

