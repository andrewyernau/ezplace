import db from "../db.ts";

interface UserSchema {
  _id: { $oid: string };
  username: string;
  email: string;
  password: string;
  minecraftUsername: string;
}

const usersCollection = db.collection<UserSchema>("users");

export default usersCollection;
