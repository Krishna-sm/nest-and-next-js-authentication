import * as nodemailer from 'nodemailer'
import { password, username } from './constant';
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: username,
        pass: password,
    },
});


export const ForgetPasswordsendEmail = async(email:string,name:string,token:string)=>{

    await transporter.sendMail({
        from: 'codehub@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Forget password", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        
                        Hi,${name},
                        
                        to forget your password plese click the link the link below

                        <a href="http://localhost:3000/reset-password?token=${token}">Click here</a>
        
        `, // html body
    });


}