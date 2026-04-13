import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    social_links: {
      linkedin: String,
      github: String,
      portfolio: String,
      twitter: String,
      hashnode: String,
      dev_to: String,
      medium: String,
    },
    resumes: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },

    isDeleted: {
      type: Boolean,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
