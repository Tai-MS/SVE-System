import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import UC from "./pages/UC/UC";

function App() {
  const { user, logout, login } = useAuth();

  return (
    <Router>
      <Header user={user} onLogout={logout} />
      <Routes>
        <Route path="/login" element={<Login login={login} />} />

        <Route
          path="/UC"
          element={
            <ProtectedRoute>
              <UC />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

