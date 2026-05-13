import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize, { testConnection } from "./database";
import { seedFaker } from "./database/faker/faker.seed";
import carRoutes from "./routes/business/car.routes";
import tuitionRoutes from "./routes/business/tuition.routes";

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings(): void {
    this.app.set("port", this.port || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api/cars", carRoutes);
    this.app.use("/api/tuitions", tuitionRoutes);
  }

  async listen() {
    try {
      await testConnection();
      await sequelize.sync({ force: false });
      console.log("Base de datos lista");
      if (process.env.SEED === "true") await seedFaker();
      await this.app.listen(this.app.get("port"));
      console.log(`Servidor corriendo en puerto ${this.app.get("port")}`);
    } catch (error) {
      console.error("Error iniciando servidor:", error);
    }
  }
}