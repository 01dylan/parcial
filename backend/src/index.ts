import dotenv from "dotenv";
dotenv.config();
import { App } from "./server";

const main = async () => {
  const app = new App(process.env.PORT || 4000);
  await app.listen();
};

main();