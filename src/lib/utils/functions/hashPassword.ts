import * as argon2 from "argon2";

export async function hashPassword(password: string) {
  try {
    return await argon2.hash(password);
  } catch {
    throw new Error("Failed to hash password");
  }
}

export async function verifyHashedPassword(
  hashedPassword: string,
  password: string,
) {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch {
    throw new Error("Failed to verify password");
  }
}
