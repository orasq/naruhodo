import { db } from "@/db";
import { activeToken, users } from "@/db/schema/users";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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

  if (!user) new NextResponse("Invalid token", { status: 404 });

  // create transaction to update both the user's active status and the activeToken validity
  // if one of the two fails, we don't want the other to go through either
  try {
    await db.transaction(async (tx) => {
      // update user to mark it as "active"
      await tx
        .update(users)
        .set({ active: true })
        .where(eq(users.id, user[0].users.id));

      // update token to mark it as "used"
      await tx
        .update(activeToken)
        .set({ activatedAt: new Date() })
        .where(eq(activeToken.token, token));
    });

    return NextResponse.redirect(new URL("/auth/activated", request.url));
  } catch {
    return new NextResponse("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
