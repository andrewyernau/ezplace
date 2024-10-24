// controllers/userController.ts
import usersCollection from "../models/users.ts";
// @ts-ignore: Ignore the following import error
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export async function createUser(username: string, email: string, password: string, minecraftUsername: string = "null") {
  const hashedPassword = await bcrypt.hash(password);
  const newUser = {
    username,
    email,
    password: hashedPassword,
    minecraftUsername
  };

  const insertedId = await usersCollection.insertOne(newUser);
  return insertedId;
}

export async function checkUserExists(email: string, username: string) {
  const existingUser = await usersCollection.findOne({
    $or: [{ email }, { username }],
  });
  return existingUser;
}

export async function findUserByEmail(email: string) {
  return await usersCollection.findOne({ email });
}

export async function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  return passwordMatch ? user : null;
}
