import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";

function Carreras() {
  const [selected, setSelected] = useState("Carreras");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen mt-4">

        {/* Carreras section */}
        <div className="flex-1 p-6">
          <div className="grid gap-4 w-full max-w-xl">
            {[
              { code: "DS", name: "Desarrollo de Software" },
              { code: "AF", name: "Analista Funcional" },
              { code: "ITI", name: "Infraestructura y Tecnología de la Información" },
            ].map((career) => (
              <Card key={career.code} className="border border-purple-200 cursor-pointer" onClick={() => navigate(`/comisiones/${career.code}`)}>
                <CardContent className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
                    {career.code}
                  </div>
                  <p className="font-medium">{career.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
  );
}

export default Carreras;
