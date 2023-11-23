import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import prisma from '@/libs/prisma'

export async function SendEmail({email, userId}: any) {
    try {
        //create hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                verifyToken: hashedToken,
                verifyTokenExpired: new Date(),
            }
        })
        
        const link = `${process.env.NEXTAUTH_URL}/login?id=${hashedToken}`
        const content = `
            <p>
                We're happy you signed up for My Apps. To start exploring the My Apps and neighborhood, 
                please confirm your email address.
            </p>
            <button style="background-color:#2CEEF0; border-radius:16px; border:none; padding:15px 20px 15px 20px;">
                <a href="${link}" style="color:#000; font-size:20px; text-decoration:none;">Verification<a>
            </button>
        `
    
        // var transporter = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //       user: "0d562ecb3bd406",
        //       pass: "1180819776e27f"
        //     }
        // });
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PW,
            }
        })
    
        let mailOptions =  {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Verification Email',
            html: content,
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    
        // await new Promise((resolve, reject) => {
        //     transporter.sendMail(mailOptions, (error, response) => {
        //         if(error) {
        //             reject(error)
        //         } else {
        //             resolve(response)
        //         }
        //     })
        // })
    } catch (error) {
        console.log(error)
    }
}