const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

// 1. Define Schema + JSON Transformation Options
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// 2. Pre-Save Password Hashing Middleware
userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) {
    return next();
  }

  const hashed = await bcrypt.hash(this.passwordHash, SALT_ROUNDS);
  this.passwordHash = hashed;
});

// 3. Password Verification Instance Method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// 4. Compile and Export Model
const User = mongoose.model("User", userSchema);
module.exports = User;
