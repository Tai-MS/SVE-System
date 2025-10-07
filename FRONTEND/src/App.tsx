import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Comunicados from "./pages/Comunicados/Comunicados";
import CrearComunicado from "./pages/Comunicados/CrearComunicado";
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
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comunicados"
          element={
            <ProtectedRoute>
              <Comunicados />
            </ProtectedRoute>
          }
        />
        <Route 
        path="/comunicados/crear/:id" 
        element={
          <ProtectedRoute>
            <CrearComunicado />
          </ProtectedRoute>} />

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;

