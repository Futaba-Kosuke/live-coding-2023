import "https://deno.land/std@0.193.0/dotenv/load.ts"

export const MYSQL_HOST = Deno.env.get("MYSQL_HOST")
export const MYSQL_USER = Deno.env.get("MYSQL_USER")
export const MYSQL_PASSWORD = Deno.env.get("MYSQL_PASSWORD")
export const MYSQL_DBNAME = Deno.env.get("MYSQL_DBNAME")