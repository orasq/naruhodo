import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { lower } from "./lower";

export async function findUserByEmail(email: string) {
  return await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));
}

export default findUserByEmail;
