"use client";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Users, Calendar, BookOpen, Clock } from "lucide-react";

type Profesor = {
	nombre: string;
	apellido: string;
};

type ComisionUC = {
	profesor: Profesor;
	id: string | number;
};

type Materias = {
	id: string | number;
	nombre: string;
	comisionesUC: ComisionUC[];
	studentsCount?: number;
	description?: string;
};

type Clase = {
	aulal?: string;
	fecha: string;
	hora_inicio?: string;
	hora_fin?: string;
};

export default function UCdetalle() {
	const location = useLocation();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	// Recibís el id y nombre desde la navegación de UC
	const { id: materiaId } = (location.state as { id: string | number }) || {};

	const [materia, setMateria] = useState<Materias | null>(null);
	const [clase, setClase] = useState<Clase[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchDetalle() {
			try {
				if (!materiaId) {
					throw new Error("Faltan datos de la materia");
				}

				const response = await fetch(
					import.meta.env.VITE_BACKURL + "/unidadcurricular/uc/" + materiaId,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							token: token!,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Error al cargar el detalle de la materia");
				}

				const data = await response.json();
				setMateria(data);
				console.log(data);
				const proximaClaseData = await fetch(
					import.meta.env.VITE_BACKURL +
						`/clase/todas/${data.comisionesUC[0].id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const proximaClaseJson = await proximaClaseData.json();
				console.log(proximaClaseJson);
				setClase(proximaClaseJson);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		}

		fetchDetalle();
	}, [materiaId, token]);
	if (loading)
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
			</div>
		);

	if (error || !materia)
		return (
			<div className="min-h-screen bg-gray-50 p-8">
				<button
					onClick={() => navigate("/UC")}
					className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
					<ArrowLeft className="h-5 w-5" /> Volver
				</button>
				<div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
					<p className="font-medium">Error</p>
					<p className="mt-1 text-sm">{error}</p>
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-white shadow-2xl rounded-2xl mt-4">
			{/* Header con imagen o color */}
			<div
				className="rounded-2xl relative h-64 bg-cover bg-center"
				style={{
					//   backgroundImage: undefined,
					backgroundColor: "#4F46E5",
				}}>
				<div className="shadow rounded-2xl absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

				<div className="relative mx-auto max-w-4xl px-8 py-8">
					<button
						onClick={() => navigate("/UC")}
						className="mb-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors">
						<ArrowLeft className="h-5 w-5" />
						Volver a unidades curriculares
					</button>

					<div className="mt-12">
						<h1 className="text-4xl font-bold text-white">{materia.nombre}</h1>
						<p className="mt-2 text-xl text-white/90">{materia.id}</p>
					</div>
				</div>
			</div>

			{/* Contenido */}
			<div className="mx-auto max-w-4xl px-8 py-8">
				{/* Información del profesor */}
				<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold text-gray-900">
						Instructor
					</h2>
					<div className="flex items-center gap-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
							<Users className="h-5 w-5" />
						</div>

						<div>
							<p className="text-lg font-medium text-gray-900">
								{materia.comisionesUC[0].profesor.nombre +
									" " +
									materia.comisionesUC[0].profesor.apellido}
							</p>
							<p className="text-sm text-gray-500">Profesor titular</p>
						</div>
					</div>
				</div>
				{/* Estadísticas */}
				<div className="mt-6 grid gap-4 sm:grid-cols-3">
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-blue-100 p-3">
								<Users className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<p className="text-2xl font-bold text-gray-900">
									{materia.studentsCount || 0}
								</p>
								<p className="text-sm text-gray-500">Estudiantes</p>
							</div>
						</div>
					</div>

					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-green-100 p-3">
								<Calendar className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">
									{clase &&
									clase.length > 0 &&
									clase[0]?.fecha &&
									clase[0]?.hora_inicio &&
									clase[0]?.hora_fin
										? clase[0].fecha.slice(-2) +
										  clase[0].fecha.slice(-6, -3) +
										  " de " +
										  clase[0].hora_inicio.slice(0, 5) +
										  " a " +
										  clase[0].hora_fin.slice(0, 5)
										: "Sin programar"}
								</p>
								<p className="text-sm text-gray-500">Próxima clase</p>
							</div>
						</div>
					</div>
					<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div
									onClick={() =>
										navigate(`/UC/detalles/${materia.comisionesUC[0].id}/materiales`, {
											state: {
												id_com_uc: materia.comisionesUC[0].id,
												id: materia.id,
												nombre: materia.nombre
											},
										})
									}>
						<div className="flex items-center gap-3">
							<div className="rounded-full bg-purple-100 p-3">
								<BookOpen className="h-6 w-6 text-purple-600" />
							</div>
							<div>
                  <p className="text-lg cursor-pointer font-medium text-gray-900 hover:underline">
                    Ver materiales
                  </p>
              </div>
								{/* <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Módulos</p> */}
							</div>
						</div>
					</div>
				</div>
            
				{/* Descripción */}
				{materia.description && (
					<div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
						<h2 className="mb-3 text-lg font-semibold text-gray-900">
							Descripción
						</h2>
						<p className="text-pretty leading-relaxed text-gray-600">
							{materia.description}
						</p>
					</div>
				)}

				{/* Información adicional */}
				<div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold text-gray-900">
						Detalles del curso
					</h2>
					<div className="space-y-3">
						<div className="flex items-center gap-3 text-gray-600">
							<Clock className="h-5 w-5" />
							<span>Duración: 16 semanas</span>
						</div>
						<div className="flex items-center gap-3 text-gray-600">
							<BookOpen className="h-5 w-5" />
							<span>Modalidad: Híbrida</span>
						</div>
						{/* <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="h-5 w-5" />
              <span>Horario: Lunes y Miércoles 14:00 - 16:00</span>
            </div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
