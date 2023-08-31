import { Subscriber } from "../../models/subscribe.js"
import { HttpError } from "../../helpers/HttpError.js"
import { sendEmail } from "../../helpers/index.js";
import "dotenv/config";

async function subscribe(req, res) { 
    const { email } = req.body;
    const subscriber = await Subscriber.findOne({ email });
    if (subscriber) throw HttpError(409, "You are already subscribed");

    const newSubsriber = await Subscriber.create(req.body,
	);

    const subscribeEmail = {
        to: email,
        subject: "Your subscription",
        html: `<strong> Thanks for joining Drink master App!</strong>`
    }


    await sendEmail(subscribeEmail);

    res.json(newSubsriber);
}

export { subscribe };