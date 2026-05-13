import { Router } from "express";
import {
  getTuitions,
  getTuition,
  createTuition,
  updateTuition,
  deleteTuition
} from "../../controllers/business/tuition.controller";

const router = Router();

router.get("/", getTuitions);
router.get("/:id", getTuition);
router.post("/", createTuition);
router.put("/:id", updateTuition);
router.delete("/:id", deleteTuition);

export default router;