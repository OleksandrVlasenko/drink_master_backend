import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

const nodmailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure:true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    }
}

const transport = nodemailer.createTransport(nodmailerConfig);

const sendEmail = async(data) => {
    const email = {...data, from: UKR_NET_EMAIL};
    return transport.sendMail(email);
}
export {sendEmail};