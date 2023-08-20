/* eslint-disable no-undef */
import aws from "aws-sdk";
import environment from "../configurations/environment.js";

const SES_CONFIG = {
    accessKeyId: environment.AWS_CONFIG.AWS_EMAIL_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_CONFIG.AWS_EMAIL_SECRET_ACCESS_KEY,
    region: environment.AWS_CONFIG.AWS_EMAIL_REGION,
};
const AWS_SES = new aws.SES(SES_CONFIG);

export const sendEmail = async (emailObject) => {
    try {
        const base64ToName = Buffer.from("Launchpad WhoIsNikhil").toString("base64");
        const Source = `=?UTF-8?B?${base64ToName}?= <${"no-reply@whoisnikhil.com"}>`;
        let params = {
            Source: Source,
            Destination: {
                ToAddresses: emailObject?.recipients,
            },
            ReplyToAddresses: [],
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: emailObject.body,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: emailObject?.subject || "New Email from Who is Nikhil!",
                },
            },
        };
        const info = AWS_SES.sendEmail(params).promise();
        console.log('Email sent:', { response: info.response });
    } catch (error) {
        console.log('Error sending email:', { error });
    }
}; 