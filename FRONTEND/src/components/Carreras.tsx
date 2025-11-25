import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";
import { apiFetch } from "../hooks/validarToken";

function Carreras() {
  const [selected, setSelected] = useState("Carreras");
  const [carreras, setCarreras] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const carrera = async() => {
    try{
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await apiFetch(import.meta.env.VITE_BACKURL + "/carreras/traerTodas")
      
      // const res = await fetch(import.meta.env.VITE_BACKURL + "/carreras/traerTodas", {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json",
      //     "auth-token": `${localStorage.getItem("token")}`
      //   }
      // })

      const data = await res.json()
      return data
    }catch(err){
      console.error("Error al traer CARRERAS: ", err)
      return false
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await carrera();
      setCarreras(result);
    };

    fetchData();
  }, []);
  return (
    <div className="flex h-screen mt-4">
      {/* Sidebar */}
      <div className="w-60 bg-purple-50 p-4 flex flex-col gap-2">
        <img
          src="/logoterciario.png"
          alt="Logo"
          className="w-12 h-12 mb-4 mx-auto"
        />
        {["Anuncios", "Carreras", "Alumnos", "Mensajes"].map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`text-left cursor-pointer px-3 py-2 rounded-md font-medium ${
              selected === item
                ? "bg-white text-purple-600 shadow-md"
                : "text-gray-700 hover:bg-purple-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center border-b px-6 py-3">
          <div></div>
          <div className="flex gap-4">
            <Button variant="text">Principal</Button>
            <Button variant="text">Mi perfil</Button>
            <Button variant="contained" color="inherit">
              Salir
            </Button>
          </div>
        </div>

        {/* Carreras section */}
        <div className="flex-1 p-6">
          <div className="grid gap-4 w-full max-w-xl">
            {carreras.map((carrera: any) => (
              <Card
                key={carrera.id}
                className="border border-purple-200 cursor-pointer"
                onClick={() => navigate(`/comisiones/${carrera.id}`)}
              >
                <CardContent>
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
                     {carrera.id || "?"}
                  </div>
          <p className="font-medium">{carrera.nombre}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carreras;