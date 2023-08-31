// import { sendEmail } from "../../helpers/index.js"
import { Subscriber } from "../../models/subscribe.js"
import { HttpError } from "../../helpers/HttpError.js"

async function subscribe(req, res) { 
    const { email } = req.body;
    const subscriber = await Subscriber.findOne({ email });
    console.log(subscriber);
    if (subscriber) throw HttpError(409, "You are already subscribed");

    const newSubsriber = await Subscriber.create(req.body,
	);

    // const subscribeEmail = {
    //     to: email,
    //     subject: "Subscribe",
    //     html: `<p> Вы подаисались на ... </p>`
    // };

    // await sendEmail(subscribeEmail);

    res.json(newSubsriber);
}

export { subscribe };