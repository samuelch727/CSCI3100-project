import mongoose from "mongoose";

interface User {
  username: String;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9]+$/,
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      index: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
