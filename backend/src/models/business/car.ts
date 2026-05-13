import { DataTypes } from "sequelize";
import sequelize from "../../database";
import { getTableName } from "../../utils/tableName";
import { getSchema } from "../../utils/schema";

// Modelo generado con apoyo de IA y ajustado manualmente
export const Car = sequelize.define("CARS", {
  car_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "CAR_ID"
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "MARCA",
    validate: {
      notNull: { msg: "La marca es obligatoria" },
      notEmpty: { msg: "La marca no puede estar vacía" },
      len: { args: [2, 50], msg: "La marca debe tener entre 2 y 50 caracteres" }
    }
  },
  clase: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "CLASE",
    validate: {
      notNull: { msg: "La clase es obligatoria" },
      isIn: {
        args: [["SEDAN", "SUV", "PICKUP", "HATCHBACK", "COUPE", "VAN"]],
        msg: "La clase debe ser SEDAN, SUV, PICKUP, HATCHBACK, COUPE o VAN"
      }
    }
  },
  modelo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "MODELO",
    validate: {
      notNull: { msg: "El modelo es obligatorio" },
      isInt: { msg: "El modelo debe ser un número entero" },
      min: { args: [1900], msg: "El modelo debe ser mayor a 1900" },
      max: { args: [2026], msg: "El modelo no puede ser mayor al año actual" }
    }
  },
  cilindraje: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "CILINDRAJE",
    validate: {
      notNull: { msg: "El cilindraje es obligatorio" },
      isFloat: { msg: "El cilindraje debe ser un número válido" },
      min: { args: [0.5], msg: "El cilindraje mínimo es 0.5" }
    }
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "CAPACIDAD",
    validate: {
      notNull: { msg: "La capacidad es obligatoria" },
      isInt: { msg: "La capacidad debe ser un número entero" },
      min: { args: [1], msg: "La capacidad mínima es 1 pasajero" },
      max: { args: [20], msg: "La capacidad máxima es 20 pasajeros" }
    }
  }
}, {
  tableName: getTableName("CARS"),
  schema: getSchema(),
  timestamps: false
});