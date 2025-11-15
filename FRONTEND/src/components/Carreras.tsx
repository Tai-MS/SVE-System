import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";

function Carreras() {
  const [selected, setSelected] = useState("Carreras");
  const [carreras, setCarreras] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const carrera = async() => {
    try{
      const token = localStorage.getItem("token");
      console.log(token);
      
      const res = await fetch(import.meta.env.VITE_BACKURL + "/carreras/traerTodas", {
        method: "GET",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

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
    <div>

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
  );
}

export default Carreras;