import * as argon2 from "argon2";

export async function hashPassword(password: string) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
}

export async function verifyHashedPassword(
  hashedPassword: string,
  password: string,
) {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    console.log(err);
  }
}
