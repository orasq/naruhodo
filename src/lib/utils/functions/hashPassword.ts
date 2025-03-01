import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
};

export const verifyHashedPassword = async (
  hashedPassword: string,
  password: string,
) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    console.log(err);
  }
};
