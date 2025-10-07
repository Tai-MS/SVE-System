export async function cargar() {
    const { Career } = await import("#components/Career/CareerModel");
    await Career.bulkCreate([
        { id: "DS",nombre: "Desarrollo de Software", duracion_meses: 36, activo: true },
        { id: "AF",nombre: "Análisis funcional", duracion_meses: 36, activo: true },
        { id: "ITI",nombre: "Infraestructura en Tecnología de la información", duracion_meses: 36, activo: true }
    ]);
}