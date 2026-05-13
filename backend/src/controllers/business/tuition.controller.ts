import { Request, Response } from "express";
import { Tuition, Car } from "../../models";

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
export const getTuitions = async (_req: Request, res: Response) => {
  try {
    const data = await Tuition.findAll({
      include: [{ model: Car, as: "car" }]
    });
    res.json(data);
  } catch (error: any) {
    handleError(error, res, "Error al obtener las matrículas");
  }
};

// GET ONE
export const getTuition = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await Tuition.findByPk(id, {
      include: [{ model: Car, as: "car" }]
    });
    if (!data) return res.status(404).json({ msg: "Matrícula no encontrada" });
    res.json(data);
  } catch (error: any) {
    handleError(error, res, "Error al obtener la matrícula");
  }
};

// CREATE
export const createTuition = async (req: Request, res: Response) => {
  try {
    const data = await Tuition.create(req.body);
    res.json(data);
  } catch (error: any) {
    handleError(error, res, "Error al crear la matrícula");
  }
};

// UPDATE
export const updateTuition = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await Tuition.update(req.body, { where: { tuition_id: id }, validate: true } as any);
    res.json({ msg: "Matrícula actualizada" });
  } catch (error: any) {
    handleError(error, res, "Error al actualizar la matrícula");
  }
};

// DELETE
export const deleteTuition = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await Tuition.destroy({ where: { tuition_id: id } });
    res.json({ msg: "Matrícula eliminada" });
  } catch (error: any) {
    handleError(error, res, "Error al eliminar la matrícula");
  }
};