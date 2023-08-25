import User from "../../models/user.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import "dotenv/config";

const { BASE_URL } = process.env;

export const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw HttpError(404, "User not found");
	if (user.verify) throw HttpError(400, "Verification has already been passed");

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<div>
          <p>
            Please,
            <a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">
              CLICK
            </a>
            on this link to verify your email
          </p>
          <p style="color: orange"><strong>WARNING!!!</strong></p>
          <p>If you have not registered with our app, <br>please ignore this email and <span style="color: red">do not click on this link!</span></p>
        </div>`,
	};

	await sendEmail(verifyEmail);

	res.json({ message: "Email resend" });
};

export default { resendVerifyEmail };
