import { Request, Response } from "express";
import { Car, Tuition } from "../../models";

// Manejo de errores de validacion generado con apoyo de IA
const handleError = (error: any, res: Response, msg: string) => {
  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    const messages = error.errors.map((e: any) => e.message);
    return res.status(400).json({ errors: messages });
  }
  console.error(error);
  res.status(500).json({ msg });
};

// GET ALL
export const getCars = async (_req: Request, res: Response) => {
  try {
    const data = await Car.findAll({
      include: [{ model: Tuition, as: "tuitions" }]
    });
    res.json(data);
  } catch (error: any) {
    handleError(error, res, "Error al obtener los carros");
  }
};

// GET ONE
export const getCar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await Car.findByPk(id, {
      include: [{ model: Tuition, as: "tuitions" }]
    });
    if (!data) return res.status(404).json({ msg: "Carro no encontrado" });
    res.json(data);
  } catch (error: any) {
    handleError(error, res, "Error al obtener el carro");
  }
};

// CREATE
export const createCar = async (req: Request, res: Response) => {
  try {
    const data = await Car.create(req.body);
    res.json(data);
  } catch (error: any) {
    handleError(error, res, "Error al crear el carro");
  }
};

// UPDATE
export const updateCar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await Car.update(req.body, { where: { car_id: id }, validate: true } as any);
    res.json({ msg: "Carro actualizado" });
  } catch (error: any) {
    handleError(error, res, "Error al actualizar el carro");
  }
};

// DELETE
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await Car.destroy({ where: { car_id: id } });
    res.json({ msg: "Carro eliminado" });
  } catch (error: any) {
    handleError(error, res, "Error al eliminar el carro");
  }
};