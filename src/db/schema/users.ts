import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { lower } from "../utils/functions/lower";

export const users = sqliteTable(
  "users",
  {
    id: text("id").notNull().primaryKey(),
    username: text("username"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    active: integer({ mode: "boolean" }).default(false),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("emailUniqueIndex").on(lower(table.email))], // index for case insensitive email
);

export const activeToken = sqliteTable("activateToken", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  token: text("token").notNull().unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  activatedAt: integer({ mode: "timestamp" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});
