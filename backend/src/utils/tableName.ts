// Retorna el nombre de la tabla según el motor de BD
export const getTableName = (table: string): string => {
  const engine = process.env.DB_ENGINE || "postgres";
  if (engine === "postgres") return table.toLowerCase();
  return table;
};