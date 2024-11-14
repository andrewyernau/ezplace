import db from "../db.ts";

export interface UserSchema {
  _id: { $oid: string };
  username: string;
  email: string;
  password: string;
  minecraftUsername: string;
}

const usersCollection = db.collection<UserSchema>("users");

export default usersCollection;
