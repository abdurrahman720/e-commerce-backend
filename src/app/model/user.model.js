import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },

    country: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.statics.isUserExist = async function (email) {
  const user = await User.findOne(
    { email },
    { email: 1},
  ).lean();

  return user;
};

export const User = model('User', UserSchema);
