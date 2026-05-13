import { Router } from "express";
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
} from "../../controllers/business/car.controller";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;