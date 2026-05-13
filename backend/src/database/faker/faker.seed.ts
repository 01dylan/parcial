import { faker } from "@faker-js/faker";
import { Car, Tuition } from "../../models";

// Faker generado con apoyo de IA y ajustado manualmente
export const seedFaker = async () => {
  const total = 20;
  console.log("Generando datos...");

  // CARS
  for (let i = 0; i < total; i++) {
    await Car.create({
      marca: faker.helpers.arrayElement([
        "Toyota", "Chevrolet", "Ford", "Mazda",
        "Renault", "Kia", "Hyundai", "Honda", "Nissan", "BMW"
      ]),
      clase: faker.helpers.arrayElement([
        "SEDAN", "SUV", "PICKUP", "HATCHBACK", "COUPE", "VAN"
      ]),
      modelo: faker.number.int({ min: 2000, max: 2026 }),
      cilindraje: parseFloat(
        faker.helpers.arrayElement(["1.0", "1.4", "1.6", "2.0", "2.4", "3.0", "3.5"])
      ),
      capacidad: faker.number.int({ min: 2, max: 8 })
    });
  }

  // TUITIONS
  const cars = await Car.findAll();

  for (let i = 0; i < total; i++) {
    await Tuition.create({
      date_matricula: faker.date.between({ from: "2020-01-01", to: "2026-01-01" }),
      ciudad: faker.helpers.arrayElement([
        "Bogotá", "Medellín", "Cali", "Barranquilla",
        "Cartagena", "Bucaramanga", "Pereira", "Manizales"
      ]),
      pago: parseFloat(faker.number.float({ min: 500000, max: 5000000, fractionDigits: 2 }).toFixed(2)),
      car_id: cars[Math.floor(Math.random() * cars.length)].get("car_id")
    });
  }

  console.log("Datos generados correctamente");
};