import User from "../models/user.js";
import { nanoid } from "nanoid";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWt_SECRET, BASE_URL } = process.env;

export const singUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exists");
  }

  const url = gravatar.url(email, { s: "250", r: "x", d: "retro" });

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    name,
    password: hashPassword,
    avatarURL: url,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<div>
            <p>
              Please,
              <a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">
                CLICK
              </a>
              on this link to verify your email
            </p>
            <p style="color: orange"><strong>WARNING!!!</strong></p>
            <p>If you have not registered with our app, <br>please ignore this email and <span style="color: red">do not click on this link!</span></p>
          </div>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default { singUp };
