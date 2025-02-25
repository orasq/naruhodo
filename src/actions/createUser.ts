"use server";

import { db } from "@/db";
import { users } from "@/db/schema/users";

export async function createUser(username: string, password: string) {
  await db.insert(users).values({
    id: crypto.randomUUID(),
    name: username,
    password: password,
  });
}
