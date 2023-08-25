import User from "../../models/user.js";
import { nanoid } from "nanoid";
import "dotenv/config";
import bcrypt from "bcrypt";
import { HttpError } from "../../helpers/index.js";
// import jwt from "jsonwebtoken";

// const { JWt_SECRET, BASE_URL } = process.env;

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already exists");

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    name,
    password: hashPassword,
    verificationToken,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export default { signUp };
