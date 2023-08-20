export const sendOtpTemplate = (name, otp) => {
    return `<html>
        <head></head>
        <body>
            <p>Hi ${name ?? 'There'}!</p>
            <h1>Your Otp is ${otp}</h1>
            <p>
                Thanks & Regards<br>
                Lanuchpad(whoisnikhil)
            </p>
        </body>
    </html>`
}