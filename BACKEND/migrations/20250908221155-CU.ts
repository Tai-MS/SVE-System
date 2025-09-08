import { QueryInterface, DataTypes } from "sequelize"

type TipoUC = "Materia" | "Taller " | "Proyecto" | "Laboratorio"
type UCSeed = {
  carrera_id: number
  nombre: string
  carga_horaria: number
  tipo: TipoUC
  activo?: boolean
  created_at?: Date
  updated_at?: Date
}

export default {
  up: async (queryInterface: QueryInterface) => {


    await queryInterface.createTable("unidades_curriculares", {
      id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      carrera_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: "carreras", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      nombre: { type: DataTypes.STRING(200), allowNull: false },
      carga_horaria: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
      tipo: { type: DataTypes.ENUM("Materia", "Taller"), allowNull: false },
      activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    })

    // Carrera (si ya existe en tu BD, podés borrar este insert y setear carrera_id a mano)
    const now = new Date()

    const carrera_id = //Poner el ID de la carrera de DS

    const materias: UCSeed[] = [
      { carrera_id, nombre: "Comunicación", carga_horaria: 48,  tipo: "Taller"  },
      { carrera_id, nombre: "UDI 1", carga_horaria: 48,  tipo: "Taller"  },
      { carrera_id, nombre: "Matemática", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Inglés Técnico 1", carga_horaria: 96,  tipo: "Materia" },
      { carrera_id, nombre: "Administración", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Tecnología de la Información", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Lógica y Estructura de Datos", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Ingeniería de Software", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Sistemas Operativos",  carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Problemáticas Socio Contemporáneas", carga_horaria: 96,  tipo: "Materia" },
      { carrera_id, nombre: "UDI 2", carga_horaria: 48,  tipo: "Taller"  },
      { carrera_id, nombre: "Inglés Técnico 2", carga_horaria: 96,  tipo: "Materia" },
      { carrera_id, nombre: "Innovación y Desarrollo Emprendedor", carga_horaria: 48,  tipo: "Materia" },
      { carrera_id, nombre: "Estadística", carga_horaria: 96,  tipo: "Materia" },
      { carrera_id, nombre: "Programación 1", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Ingeniería de Software 2", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Bases de Datos 1", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Práctica Profesionalizante 1", carga_horaria: 192, tipo: "Proyecto"  },
      { carrera_id, nombre: "Ética y Responsabilidad Social", carga_horaria: 48,  tipo: "Materia" },
      { carrera_id, nombre: "Derecho y Legislación Laboral", carga_horaria: 48,  tipo: "Materia" },
      { carrera_id, nombre: "Redes y Comunicación", carga_horaria: 128, tipo: "Laboratorio" },
      { carrera_id, nombre: "Programación 2", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Gestión de Proyectos de Software", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Bases de Datos 2", carga_horaria: 128, tipo: "Materia" },
      { carrera_id, nombre: "Práctica Profesionalizante 2", carga_horaria: 192, tipo: "Proyecto"  },
    ].map((m) => ({ ...m, activo: true, created_at: now, updated_at: now }))

    await queryInterface.bulkInsert("unidades_curriculares", materias)
  },

  down: async (queryInterface: QueryInterface) => {
    const nombres = [
      "Comunicación","UDI 1","Matemática","Inglés Técnico 1","Administración",
      "Tecnología de la Información","Lógica y Estructura de Datos","Ingeniería de Software",
      "Sistemas Operativos","Problemáticas Socio Contemporáneas","UDI 2","Inglés Técnico 2",
      "Innovación y Desarrollo Emprendedor","Estadística","Programación 1","Ingeniería de Software 2",
      "Bases de Datos 1","Práctica Profesionalizante 1","Ética y Responsabilidad Social",
      "Derecho y Legislación Laboral","Redes y Comunicación","Programación 2",
      "Gestión de Proyectos de Software","Bases de Datos 2","Práctica Profesionalizante 2",
    ]

    await queryInterface.bulkDelete("unidades_curriculares", { nombre: nombres })

    // Para borrar el ENUM en MySQL/MariaDB hay que dropear la tabla primero (ya lo hacemos)
    await queryInterface.dropTable("unidades_curriculares")
  },
}
