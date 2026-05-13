import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const engine = process.env.DB_ENGINE || "postgres";

let sequelize: Sequelize;

if (engine === "postgres") {
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_NAME,
    logging: false
  });
} else {
  throw new Error(`Motor de BD no soportado: ${engine}`);
}

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conectado a ${engine.toUpperCase()}`);
  } catch (error) {
    console.error("Error de conexión:", error);
    throw error;
  }
};

export default sequelize;