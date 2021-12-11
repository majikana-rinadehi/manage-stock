const functions = require("firebase-functions");
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // 必要
    port: 465, // secure: true → port: 465 / secure: false → port: 
    secure: true, 
    auth: {
        user: "rudyrudy2103@gmail.com", 
        pass: "eldrzwcltcfqsxqq" // Google アカウントのログインパスワードではなく、アプリパスワードを指定する。
    }
})

exports.sendMail = functions.https.onCall(async (data, context) => {
    await transporter.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.text,
    },(err, info) => {
        if(err) {
            console.log(err);
        }else{
            console.log(`Email sent:  ${info.response}`);
        }
    })
})

const admin = require('firebase-admin')
admin.initializeApp()