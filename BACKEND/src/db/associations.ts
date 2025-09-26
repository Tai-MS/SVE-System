import { Calificacion } from "../components/Calification/CalificationModel"
import { Career } from "../components/Career/CareerModel"
import { Asistencia } from "../components/ClassAttendance/ClassAttendanceModel"
import { Aula } from "../components/Classroom/ClassroomModel"
import { Clase } from "../components/ClassSession/ClassSessionModel"
import { Comision } from "../components/Comision/ComisionModel"
import { ComisionAlumno } from "../components/ComissionStudent/ComissionStudentModel"
import { UnidadCurricular } from "../components/CurricularUnit/CurricularUnitModel"
import { Material } from "../components/Material/MaterialModel"
import Usuario from "../components/User/UserModel"

Career.hasMany(UnidadCurricular, { foreignKey: "carrera_id", as: "unidades" })
UnidadCurricular.belongsTo(Career, { foreignKey: "carrera_id", as: "carrera" })

UnidadCurricular.hasMany(Comision, { foreignKey: "unidad_curricular_id", as: "comisiones" })
Comision.belongsTo(UnidadCurricular, { foreignKey: "unidad_curricular_id", as: "unidadCurricular" })

Comision.belongsToMany(Usuario, {
  through: ComisionAlumno,
  foreignKey: "comision_id",
  otherKey: "alumno_id",
  as: "alumnos",
})
Usuario.belongsToMany(Comision, {
  through: ComisionAlumno,
  foreignKey: "alumno_id",
  otherKey: "comision_id",
  as: "comisiones",
})

Aula.hasMany(Clase, { foreignKey: "aula_id", as: "clases" })
Clase.belongsTo(Aula, { foreignKey: "aula_id", as: "aula" })

UnidadCurricular.hasMany(Clase, { foreignKey: "unidad_curricular_id", as: "clases" })
Clase.belongsTo(UnidadCurricular, { foreignKey: "unidad_curricular_id", as: "unidadCurricular" })

Comision.hasMany(Clase, { foreignKey: "comision_id", as: "clases" })
Clase.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" })

Usuario.hasMany(Clase, { foreignKey: "profesor_id", as: "clasesDictadas" })
Clase.belongsTo(Usuario, { foreignKey: "profesor_id", as: "profesor" })

Clase.belongsToMany(Usuario, { through: Asistencia, foreignKey: "clase_id", otherKey: "alumno_id", as: "asistentes" })
Usuario.belongsToMany(Clase, { through: Asistencia, foreignKey: "alumno_id", otherKey: "clase_id", as: "asistencias" })

Comision.hasMany(Calificacion, { foreignKey: "comision_id", as: "calificaciones" })
Calificacion.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" })
Usuario.hasMany(Calificacion, { foreignKey: "alumno_id", as: "calificaciones" })
Calificacion.belongsTo(Usuario, { foreignKey: "alumno_id", as: "alumno" })

Clase.hasMany(Material, { foreignKey: "clase_id", as: "materiales" })
Material.belongsTo(Clase, { foreignKey: "clase_id", as: "clase" })
