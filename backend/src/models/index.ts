import { Car } from "./business/car";
import { Tuition } from "./business/tuition";

// Asociaciones entre modelos
Car.hasMany(Tuition, { foreignKey: "car_id", as: "tuitions" });
Tuition.belongsTo(Car, { foreignKey: "car_id", as: "car" });

export { Car, Tuition };