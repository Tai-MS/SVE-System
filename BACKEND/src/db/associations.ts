import { Career } from "#components/Career/CareerModel";
import { UnidadCurricular } from "#components/CurricularUnit/CurricularUnitModel";
import { Comision } from "#components/Comission/ComissionModel";
import User from "#components/User/UserModel";
import { ComisionUC } from "#components/ComisionUC/ComisionUCModel";
import { Clase } from "#components/ClassSession/ClassSessionModel";
import { Aula } from "#components/Classroom/ClassroomModel";
import { Asistencia } from "#components/ClassAttendance/ClassAttendanceModel";
import { Calificacion } from "#components/Calification/CalificationModel";
import { Material } from "#components/Material/MaterialModel";
import Usuario from "#components/User/UserModel";
import UsuarioUnidadCurricular from "#components/UsuarioUC/UsuarioUC";
import { Profesor } from "#components/Profesor/ProfesorModel";

let associationsApplied = false;

export function applyAssociations() {
  if (associationsApplied) return;
  associationsApplied = true;

  Usuario.belongsToMany(UnidadCurricular, {
    through: UsuarioUnidadCurricular,
    foreignKey: "usuario_id",
    otherKey: "unidad_curricular_id",
  });
  UnidadCurricular.belongsToMany(Usuario, {
    through: UsuarioUnidadCurricular,
    foreignKey: "unidad_curricular_id",
    otherKey: "usuario_id",
  });

  Career.hasMany(Usuario, { foreignKey: "carrera_id_fk" });
  Usuario.belongsTo(Career, { foreignKey: "carrera_id_fk" });

  Comision.belongsToMany(UnidadCurricular, {
    through: ComisionUC,
    foreignKey: "comision_id",
    otherKey: "uc_id",
    as: "unidadesCurriculares",
  });
  UnidadCurricular.belongsToMany(Comision, {
    through: ComisionUC,
    foreignKey: "uc_id",
    otherKey: "comision_id",
    as: "comisiones",
  });

  Comision.hasMany(ComisionUC, { foreignKey: "comision_id", as: "comisionesUC" });
  ComisionUC.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" });

  UnidadCurricular.hasMany(ComisionUC, { foreignKey: "uc_id", as: "comisionesUC" });
  ComisionUC.belongsTo(UnidadCurricular, { foreignKey: "uc_id", as: "unidadCurricular" });

  Usuario.hasMany(ComisionUC, { foreignKey: "profesor_id", as: "dictados" });
ComisionUC.belongsTo(Usuario, { foreignKey: "profesor_id", as: "profesor" });

  Aula.hasMany(Clase, { foreignKey: "aula_id", as: "clases" });
  Clase.belongsTo(Aula, { foreignKey: "aula_id", as: "aula" });

  Comision.hasMany(Usuario, { foreignKey: "comision_id", as: "alumnos" });
  Usuario.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" });

  UnidadCurricular.hasMany(Clase, { foreignKey: "unidad_curricular_id", as: "clases" });
  Clase.belongsTo(UnidadCurricular, { foreignKey: "unidad_curricular_id", as: "unidadCurricular" });

  Comision.hasMany(Clase, { foreignKey: "comision_id", as: "clases" });
  Clase.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" });

  User.hasMany(Clase, { foreignKey: "profesor_id", as: "clasesDictadas" });
  Clase.belongsTo(User, { foreignKey: "profesor_id", as: "profesor" });

  Clase.belongsToMany(User, { through: Asistencia, foreignKey: "clase_id", otherKey: "alumno_id", as: "asistentes" });
  User.belongsToMany(Clase, { through: Asistencia, foreignKey: "alumno_id", otherKey: "clase_id", as: "asistencias" });

  Comision.hasMany(Calificacion, { foreignKey: "comision_id", as: "calificaciones" });
  Calificacion.belongsTo(Comision, { foreignKey: "comision_id", as: "comision" });

  User.hasMany(Calificacion, { foreignKey: "alumno_id", as: "calificaciones" });
  Calificacion.belongsTo(User, { foreignKey: "alumno_id", as: "alumno" });

  Clase.hasMany(Material, { foreignKey: "clase_id", as: "materiales" });
  Material.belongsTo(Clase, { foreignKey: "clase_id", as: "clase" });
}
