// Retorna el schema según el motor de BD
export const getSchema = (): string | undefined => {
  const engine = process.env.DB_ENGINE || "postgres";
  if (engine === "postgres") return "public";
  return undefined;
};