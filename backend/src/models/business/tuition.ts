import { DataTypes } from "sequelize";
import sequelize from "../../database";
import { getTableName } from "../../utils/tableName";
import { getSchema } from "../../utils/schema";

// Modelo generado con apoyo de IA y ajustado manualmente
export const Tuition = sequelize.define("TUITIONS", {
  tuition_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "TUITION_ID"
  },
  date_matricula: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "DATE_MATRICULA",
    validate: {
      isDate: { msg: "La fecha de matrícula no tiene un formato válido", args: true }
    }
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "CIUDAD",
    validate: {
      notNull: { msg: "La ciudad es obligatoria" },
      notEmpty: { msg: "La ciudad no puede estar vacía" },
      len: { args: [3, 100], msg: "La ciudad debe tener entre 3 y 100 caracteres" }
    }
  },
  pago: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "PAGO",
    validate: {
      notNull: { msg: "El pago es obligatorio" },
      isFloat: { msg: "El pago debe ser un número válido" },
      min: { args: [0], msg: "El pago no puede ser negativo" }
    }
  },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "CAR_ID",
    validate: {
      notNull: { msg: "El car_id es obligatorio" },
      isInt: { msg: "El car_id debe ser un número entero" }
    }
  }
}, {
  tableName: getTableName("TUITIONS"),
  schema: getSchema(),
  timestamps: false
});