import { Calificacion } from "#components/Calification/CalificationModel"
import { Career } from "#components/Career/CareerModel"
import { Asistencia } from "#components/ClassAttendance/ClassAttendanceModel"
import { Aula } from "#components/Classroom/ClassroomModel"
import { Clase } from "#components/ClassSession/ClassSessionModel"
import { Comision } from "#components/Comission/ComissionModel"
import { ComisionAlumno } from "#components/ComissionStudent/ComissionStudentModel"
import { UnidadCurricular } from "#components/CurricularUnit/CurricularUnitModel"
import { Material } from "#components/Material/MaterialModel"
import  User  from "#components/User/UserModel"

Career.hasMany(UnidadCurricular, { foreignKey: "carrera_id", as: "unidades" })
UnidadCurricular.belongsTo(Career, { foreignKey: "carrera_id", as: "carrera" })

UnidadCurricular.hasMany(Comision, { foreignKey: "unidad_curricular_id", as: "comisiones" })
Comision.belongsTo(UnidadCurricular, { foreignKey: "unidad_curricular_id", as: "unidadCurricular" })

Comision.belongsToMany(User, {
  through: ComisionAlumno,
  foreignKey: "comision_id",
  otherKey: "alumno_id",
  as: "alumnos",
})
User.belongsToMany(Comision, {
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

User.hasMany(Clase, { foreignKey: "profesor_id", as: "clasesDictadas" })
Clase.belongsTo(User, { foreignKey: "profesor_id", as: "profesor" })

Clase.belongsToMany(User, { through: Asistencia, foreignKey: "clase_id", otherKey: "alumno_id", as: "asistentes" })
User.belongsToMany(Clase, { through: Asistencia, foreignKey: "alumno_id", otherKey: "clase_id", as: "asistencias" })

Comision.hasMany(Calificacion, { foreignKey: "comision_id", as: "calificaciones" })
Calificacion.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" })
User.hasMany(Calificacion, { foreignKey: "alumno_id", as: "calificaciones" })
Calificacion.belongsTo(User, { foreignKey: "alumno_id", as: "alumno" })

Clase.hasMany(Material, { foreignKey: "clase_id", as: "materiales" })
Material.belongsTo(Clase, { foreignKey: "clase_id", as: "clase" })
