import mongoose from "mongoose";

interface User {
  username: String;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]+$/,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
