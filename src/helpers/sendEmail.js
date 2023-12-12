import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import prisma from '../../prisma/index.js';

export const sendEmail = async({ email, userId }) => {
    try {
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 5);

        const hashedToken = await bcrypt.hash(userId.toString(), 10); 
        console.log(hashedToken)

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                passwordResetToken: hashedToken,
                passwordResetTokenExpiry : expiryDate
            }
        })
        try {
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "0da10c19875d98",
                  pass: "3c6a262404bf2b"
                }
            });

          
            
            const mailOptions = {
                from: "beorganic.ws",
                to: email,
                subject: "Reset your password",
                html: `<p>
                Copy and paste this link to your browser to reset your password! <br/>
                http://localhost:3000/password-reset?token=${hashedToken}
    
                </p>`
            }
    
            const mailResponse = await transport.sendMail(mailOptions);
            return mailResponse;
        }
        catch (err) {
            console.log("err from nodemailer", err)
        }

    }
    catch (err) {
        console.log(err)
    }
}