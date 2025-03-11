import { db } from "@/db";
import { activeToken, users } from "@/db/schema/users";
import { and, eq, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  // find user related to the token
  const user = await db
    .select()
    .from(users)
    .innerJoin(activeToken, eq(activeToken.userId, users.id))
    .where(and(eq(activeToken.token, token), isNull(activeToken.activatedAt)))
    .limit(1);

  // TODO - better handling of this
  if (!user) throw new Error("Invalid token");

  // update user to mark it as "active"
  await db
    .update(users)
    .set({ active: true })
    .where(eq(users.id, user[0].users.id));

  // update token to mark it as "used"
  await db
    .update(activeToken)
    .set({ activatedAt: new Date() })
    .where(eq(activeToken.token, token));

  redirect("/auth/activated");
}
