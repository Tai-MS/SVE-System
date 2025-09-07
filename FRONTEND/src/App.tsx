// import { useState } from "react";
// import Login from "./components/Login";
// import Comunicados from "./pages/Comunicados/Comunicados";
import CrearComunicado from "./pages/Comunicados/CrearComunicado";

const App = () => {
  // const [user, setUser] = useState<string | null>(null);
  return (
    <>
      {/* <Login setUser={setUser} />
      {user && <div>Logged in as: {user}</div>}
       */}
      <CrearComunicado />
    </>
  );
};

export default App;
