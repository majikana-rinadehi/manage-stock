const functions = require("firebase-functions");
const nodemailer = require('nodemailer')
const line = require('@line/bot-sdk')
const configs = functions.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // 必要
    port: 465, // secure: true → port: 465 / secure: false → port: 
    secure: true, 
    auth: {
        user: "rudyrudy2103@gmail.com", 
        pass: "eldrzwcltcfqsxqq" // Google アカウントのログインパスワードではなく、アプリパスワードを指定する。
    }
})

/**
 * sending shopping list email
 * @param data
 */
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

/**
 * seding "Hello from Firebase" on Line
 */
exports.helloWorld = functions.https.onRequest(async (request, response) => {
    const events = request.body.events
    const client = new line.Client({
        channelAccessToken: configs.manage_stock.access_token,
        channelSecret: configs.manage_stock.channel_secret
    })
    const result = await client.replyMessage(events[0].replyToken, { type: "text", text: "Hello!!!!"})
    response.json(result)
})

const admin = require('firebase-admin')
admin.initializeApp()