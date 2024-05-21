import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Types.ObjectId, ref: "posts" }],
});

const User = mongoose.model("User", schema);

export default User;
