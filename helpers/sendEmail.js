import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

const nodmailerconfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure:true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    }
}

const transport = nodemailer.createTransport(nodmailerconfig);

const sendEmail = async(data) => {
    const email = {...data, from: UKR_NET_EMAIL}
    return transport.sendEmail(email)
}
export {sendEmail};