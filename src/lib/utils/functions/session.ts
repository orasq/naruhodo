import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE_KEY } from "../constants";

const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET_KEY);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  const session = await encryptSession({ userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_KEY);
}

export function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey);
}

export async function decryptSession(sessionToken: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(sessionToken, secretKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {}
}
