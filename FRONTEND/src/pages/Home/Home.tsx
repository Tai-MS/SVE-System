import { type JSX } from "react";
import Sidebar from "../../components/Sidebar";
import { Card } from "../../components/Card";

function Home(): JSX.Element {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="ml-60 mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Unidades Curriculares
          </h1>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Bases de Datos"
              code="BD-2024"
              instructor="Carlos Rodríguez"
              instructorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
              coverColor="#f4b400"
              studentsCount={28}
              nextClass="Mar 14:00"
              description="Diseño, implementación y gestión de bases de datos relacionales y NoSQL."
            />
            <Card
              title="Bases de Datos"
              code="BD-2024"
              instructor="Carlos Rodríguez"
              instructorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
              coverColor="#f4b400"
              studentsCount={28}
              nextClass="Mar 14:00"
              description="Diseño, implementación y gestión de bases de datos relacionales y NoSQL."
            />
            <Card
              title="Bases de Datos"
              code="BD-2024"
              instructor="Carlos Rodríguez"
              instructorAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
              coverColor="#f4b400"
              studentsCount={28}
              nextClass="Mar 14:00"
              description="Diseño, implementación y gestión de bases de datos relacionales y NoSQL."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
