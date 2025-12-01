"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card } from "../../components/Card"

type Profesor = {
  nombre: string;
  apellido: string;
};

type ComisionUC = {
  profesor: Profesor;
  id: string | number;
};

type Materias = {
    profesor: string;
  id: string | number;
  nombre: string;
  tipo_uc: string;
  comisionesUC: string[];
  carga_horaria?: number;
  studentsCount?: number;
  description?: string;
};


export function ClassroomList() {
  const { careerId } = useParams<{ careerId: string }>()
  const navigate = useNavigate()
if (!careerId) {
    return <div className="p-8">ID de carrera no proporcionado.</div>
  }
    const [classrooms, setClassrooms] = useState<Materias[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
      setLoading(true)
      setError(null)
        // Simular llamada a API
        setTimeout(() => {
            try {
                let data: Materias[] = []
                if (careerId === "ds") {
                    data = DS_CLASSROOMS
                } else if (careerId === "af") {
                    data = AF_CLASSROOMS
                } else if (careerId === "iti") {
                    data = ITI_CLASSROOMS
                }
                setClassrooms(data)
                setLoading(false)
            } catch (err) {
                setError("Error al cargar las unidades curriculares.")
                setLoading(false)
            }
        }, 200)
    }, [careerId])


  const getCareerName = (id: string | undefined) => {
    const careers: Record<string, string> = {
      af: "💼 Analista Funcional",
      ds: "💻Desarrollo de Software",
      iti: "🔧Infraestructura de TI",
    }
    return careers[id || ""] || "Carrera"
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 bg-gray-600 p-6 rounded-lg text-white shadow">
          <button
            onClick={() => navigate("/carreras")}
            className="mb-4 flex items-center text-sm font-medium text-white transition-colors hover:text-gray-900"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Carreras
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{getCareerName(careerId)}</h1>
              <p className="mt-1 text-white/80">Unidades Curriculares</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="font-medium">Error al cargar los datos</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((classroom) => (
              <Card
                key={classroom.id}
                nombre={classroom.nombre}
                codigoMateria={classroom.tipo_uc}
                instructor={classroom.profesor}
                studentsCount={classroom.studentsCount}
                description={classroom.description}
              />
            ))}
          </div>
        )}

        {!loading && !error && classrooms.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">No hay unidades curriculares disponibles</p>
          </div>
        )}
      </div>
    </div>
  )
}



const DS_CLASSROOMS = [
  { "id": "a1f7c1a1-4f2b-4a22-9c0e-517eac12a101", "nombre": "Comunicación", "carga_horaria": 48, "tipo_uc": "TALLER", "profesor": "Mariana López" },
  { "id": "b2d4f3e2-183b-497d-94fa-71ee92c9c202", "nombre": "UDI 1", "carga_horaria": 48, "tipo_uc": "TALLER", "profesor": "Ricardo Fernández" },
  { "id": "c3e8a3f3-29d5-4fa1-aa2b-51de92ac3103", "nombre": "Matemática", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Laura Benítez" },
  { "id": "d4f1b4a4-7d13-4e2c-bd2f-6a22cdab4404", "nombre": "Inglés Técnico 1", "carga_horaria": 96, "tipo_uc": "MATERIA", "profesor": "Jonathan Medina" },
  { "id": "e5a9c5b5-91ac-4f02-94fb-1172ddbc5505", "nombre": "Administración", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Cecilia Duarte" },
  { "id": "f6b1d6c6-82bb-41de-a652-9912efd16606", "nombre": "Tecnología de la Información", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Diego Romero" },
  { "id": "a7c2e7d7-51cc-4c29-8ab1-71aa12a27707", "nombre": "Lógica y Estructura de Datos", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Silvana Herrera" },
  { "id": "b8d3f8e8-92dd-4a33-87cc-82cc23b38808", "nombre": "Ingeniería de Software", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Maximiliano Ruiz" },
  { "id": "c9e4a9f9-83ee-41ab-8dad-93de34c49909", "nombre": "Sistemas Operativos", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Juliana Cabral" },
  { "id": "d0f5b0a0-74ff-4fa1-bede-04ef45d50010", "nombre": "Problemáticas Socio Contemporáneas", "carga_horaria": 96, "tipo_uc": "MATERIA", "profesor": "Andrés Vega" },
  { "id": "e1a6c1b1-65aa-4dc1-8abc-15a056e61111", "nombre": "UDI 2", "carga_horaria": 48, "tipo_uc": "TALLER", "profesor": "Yanina Paredes" },
  { "id": "f2b7d2c2-55bb-4e11-877a-26b167f72212", "nombre": "Inglés Técnico 2", "carga_horaria": 96, "tipo_uc": "MATERIA", "profesor": "Martín Gutiérrez" },
  { "id": "a3c8e3d3-44cc-4f44-aabc-37c278g83313", "nombre": "Innovación y Desarrollo Emprendedor", "carga_horaria": 48, "tipo_uc": "MATERIA", "profesor": "Carla Espinoza" },
  { "id": "b4d9f4e4-33dd-41dd-bacd-48d389h94414", "nombre": "Estadística", "carga_horaria": 96, "tipo_uc": "MATERIA", "profesor": "Sebastián Torres" },
  { "id": "c5e0a5f5-22ee-4fa1-8aae-59e410i05515", "nombre": "Programación 1", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Romina Castro" },
  { "id": "d6f1b6a6-11ff-41bc-9bbf-60f521j16616", "nombre": "Ingeniería de Software 2", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Rodrigo Álvarez" },
  { "id": "e7a2c7b7-01aa-41cc-abcd-71g632k27717", "nombre": "Bases de Datos 1", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Gisela Navarro" },
  { "id": "f8b3d8c8-92bb-4d11-bccc-82h743l38818", "nombre": "Práctica Profesionalizante 1", "carga_horaria": 192, "tipo_uc": "PRACTICA PROFESIONALIZANTE", "profesor": "Pablo Santoro" },
  { "id": "a9c4e9d9-83cc-4f22-8ddd-93i854m49919", "nombre": "Ética y Responsabilidad", "carga_horaria": 48, "tipo_uc": "MATERIA", "profesor": "Claudia Peralta" },
  { "id": "b0d5f0e0-74dd-4022-9eee-04j965n50020", "nombre": "Derecho y Legislación Laboral", "carga_horaria": 48, "tipo_uc": "MATERIA", "profesor": "Gustavo Molina" },
  { "id": "c1e6a1f1-65ee-4aa2-8fff-15k076o61121", "nombre": "Redes y Comunicación", "carga_horaria": 128, "tipo_uc": "LABORATORIO", "profesor": "Leonardo Funes" },
  { "id": "d2f7b2a2-55ff-4bb2-a1aa-26l187p72222", "nombre": "Programación 2", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Natalia Rivas" },
  { "id": "e3a8c3b3-44aa-4cc1-b2bb-37m298q83323", "nombre": "Gestión de PRACTICA PROFESIONALIZANTEs de Software", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Hernán Espíndola" },
  { "id": "f4b9d4c4-33bb-41d1-c3cc-48n309r94424", "nombre": "Bases de Datos 2", "carga_horaria": 128, "tipo_uc": "MATERIA", "profesor": "Pamela Ortiz" },
  { "id": "a5c0e5d5-22cc-4fa1-d4dd-59o410s05525", "nombre": "Práctica Profesionalizante 2", "carga_horaria": 192, "tipo_uc": "PRACTICA PROFESIONALIZANTE", "profesor": "Federico Villalba" }
  ]

const AF_CLASSROOMS = [
    { "id": "b4bcf036-b910-415b-9810-4b3c1631ed45", "nombre": "Comunicación", "carga_horaria": 48, "tipo_uc": "TALLER" },
    { "id": "cf5f6bfd-0edf-4d43-bbb8-64b3800bd85e", "nombre": "UDI 1", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "b0b36fc9-3671-4be1-9d14-43fda9e90227", "nombre": "Matemática", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "5c4e9f72-8394-4fbc-aa40-b32e03fde3d8", "nombre": "Inglés Técnico 1", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "f78916b0-3ef0-4f25-9a91-3b7a4f25c45f", "nombre": "Psicosociología de las Organizaciones", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "9023d572-8040-4c3c-830e-0dbded6dfd18", "nombre": "Modelos de Negocios", "carga_horaria": 96, "tipo_uc": "TALLER" },
    { "id": "14c3c299-8d81-4b82-ae70-f5e516a70c48", "nombre": "Arquitectura de las Computadoras", "carga_horaria": 128, "tipo_uc": "TALLER" },
    { "id": "a54146b5-41d1-4c28-ad04-fcd41c2b4c7b", "nombre": "Gestión de Software", "carga_horaria": 128, "tipo_uc": "TALLER" },
    { "id": "36dfb26d-b018-44a8-b05e-040d136c27f6", "nombre": "Análisis de Sistemas Organizacionales", "carga_horaria": 160, "tipo_uc": "TALLER" },
    { "id": "0a9f4502-3603-4aa5-9d52-83e632ee4e5c", "nombre": "Problemáticas Socio Contemporáneas", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "fd48a993-93a5-483d-ba7f-bc0a2c7d4194", "nombre": "UDI 2", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "c6d4be8e-56ad-4877-9aec-740d79134d5f", "nombre": "Inglés Técnico 2", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "d102c427-9184-4f6e-a4f1-ebc58660dbef", "nombre": "Estadística", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "c05eb5d4-27b9-4e14-9483-c79027e53ad8", "nombre": "Innovación y Desarrollo Emprendedor", "carga_horaria": 96, "tipo_uc": "TALLER" },
    { "id": "341f7c1e-6a18-4118-b400-25c69b08f75d", "nombre": "Gestión de Software 2", "carga_horaria": 128, "tipo_uc": "TALLER" },
    { "id": "3c8834f9-f0ba-409d-a634-5a422ff0e8f3", "nombre": "Estrategias de Negocios", "carga_horaria": 128, "tipo_uc": "PRACTICA PROFESIONALIZANTE" },
    { "id": "fa4a2c37-1388-4e7a-99ce-0da68e9a7ea3", "nombre": "Desarrollo de Sistemas", "carga_horaria": 160, "tipo_uc": "TALLER" },
    { "id": "f09f67f1-a870-4068-8a3c-c8ae77ae41cf", "nombre": "Práctica Profesionalizante 1", "carga_horaria": 192, "tipo_uc": "PRACTICA PROFESIONALIZANTE" },
    { "id": "2d5af7fe-6d8c-4ddf-bc87-3cc04a768ec5", "nombre": "Ética y Responsabilidad", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "b1bd55b1-dfcf-4e23-b91f-43416f2b61a0", "nombre": "Derecho y Legislación Laboral", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "1dcafcf0-1bb0-438d-9dbe-9ae623afec68", "nombre": "Redes y Comunicaciones", "carga_horaria": 128, "tipo_uc": "LABORATORIO" },
    { "id": "272c6aa8-f1e6-4477-8b38-e2fa88cc8d75", "nombre": "Seguridad Sistemas", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "7f16cce0-bffe-4f63-8d07-d653ce26c4b0", "nombre": "Bases de Datos", "carga_horaria": 128, "tipo_uc": "TALLER" },
    { "id": "b1bf7018-708f-48a7-89ff-75d8f9d94f45", "nombre": "Sistema de Información Organizacional", "carga_horaria": 128, "tipo_uc": "TALLER" },
    { "id": "0b28df52-48a3-4d07-9d34-8620ffba6048", "nombre": "Desarrollo de Sistemas Web", "carga_horaria": 160, "tipo_uc": "TALLER" },
    { "id": "fb0f9fa7-b166-4ef2-ab97-61a92052f60e", "nombre": "Práctica Profesionalizante 2", "carga_horaria": 192, "tipo_uc": "PRACTICA PROFESIONALIZANTE" }
  ]

const ITI_CLASSROOMS = [
    { "id": "65172fb0-d932-4bc4-8fe0-bc682f92cbea", "nombre": "Comunicación", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "bb13d80a-63d2-4ff3-96ba-0f1a87a2935c", "nombre": "UDI 1", "carga_horaria": 48, "tipo_uc": "TALLER" },
    { "id": "d98d8530-e714-44d1-9b5b-00dd7c6d9b42", "nombre": "Matemática", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "43af9531-dba1-47c6-a2c3-b5b5efa3ce56", "nombre": "Física Aplicada a las Tecnologías de la Información", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "e5ece97a-7a79-4be5-afc8-48f9b5f96d1b", "nombre": "Administración", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "289107cc-4f3a-4937-845f-38f939ca4b45", "nombre": "Inglés Técnico", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "57bfd671-8919-4a68-8177-9c86b6e6b57b", "nombre": "Arquitectura de las Computadoras", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "4b7f23ab-f2a8-440c-91e9-584fd83c7cb0", "nombre": "Lógica y Programación", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "53db013c-2068-4a03-b80d-9e6bbf47cadd", "nombre": "Infraestructura de Redes 1", "carga_horaria": 64, "tipo_uc": "MATERIA" },
    { "id": "cb68fe8f-f183-4a35-babd-b85b7be35ae2", "nombre": "Problemáticas Socio Contemporáneas", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "11123a7f-309a-4fbd-8b50-daa6dcf4660a", "nombre": "UDI 2", "carga_horaria": 48, "tipo_uc": "TALLER" },
    { "id": "4fb30608-360c-45c6-8599-56fa6cf96ca0", "nombre": "Estadística", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "54ec2f63-ef36-4d0d-8034-d907612e33db", "nombre": "Innovación y Desarrollo Emprendedor", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "10b312a1-9d06-4c4b-aa5d-dc6c7c4b81e3", "nombre": "Sistemas Operativos", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "9ad65a87-bdf3-4d1a-ae59-02be86b9c7a4", "nombre": "Algoritmos y Estructura de Datos", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "48a98feb-1c94-4eb7-a12b-5a271b0d47ea", "nombre": "Bases de Datos 1", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "be5b8bdf-e0a4-4d5b-8548-c680d85d1dee", "nombre": "Infraestructura de Redes 2", "carga_horaria": 128, "tipo_uc": "LABORATORIO" },
    { "id": "e503210b-8e65-4f23-9dd8-712e26dfc6cc", "nombre": "Práctica Profesionalizante 1", "carga_horaria": 192, "tipo_uc": "PRACTICA PROFESIONALIZANTE" },
    { "id": "27b95b6c-3b7f-4d4f-b842-a8b3d4727571", "nombre": "Ética y Responsabilid", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "4b627f59-e5cd-49eb-9168-b3af0a5b33d7", "nombre": "Derecho y Legislación Laboral", "carga_horaria": 48, "tipo_uc": "MATERIA" },
    { "id": "45e0a71d-9e39-46d3-a4a8-a86e9c6908e4", "nombre": "Administración de Bases de Datos", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "2710c6cc-8148-4fd1-ac35-5d217691815c", "nombre": "Seguridad Sistemas", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "572545b7-6fbd-4f1f-b75f-4e6cac0f4b4e", "nombre": "Integridadción de Datos", "carga_horaria": 96, "tipo_uc": "MATERIA" },
    { "id": "5c4c02d3-fbcf-4e8e-9eed-1f482d2b03e8", "nombre": "Administración de Sistemas Operativos y Redes", "carga_horaria": 128, "tipo_uc": "MATERIA" },
    { "id": "bdc3a8cf-5adf-405b-a96f-96d0fba9f3dc", "nombre": "Práctica Profesionalizante 2", "carga_horaria": 256, "tipo_uc": "PRACTICA PROFESIONALIZANTE" }
  ]
