import { sql } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { lower } from "../utils/functions/lower";

export const users = sqliteTable(
  "users",
  {
    id: text("id").notNull().primaryKey(),
    username: text("username"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("emailUniqueIndex").on(lower(table.email))], // index for case insensitive email
);
