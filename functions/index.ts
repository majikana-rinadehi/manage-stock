import { LineData, MailData } from '../src/disposable/types'

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
const sendingMail = async (data: MailData, context): Promise<void> => {
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
}
exports.sendMail = functions.https.onCall(sendingMail)

/**
 * seding "Hello from Firebase" on Line
 */
const helloingWorld = async (request, response): Promise<void> => {
    const events = request.body.events
    const client = new line.Client({
        channelAccessToken: configs.manage_stock.access_token,
        channelSecret: configs.manage_stock.channel_secret
    })
    const result = await client.replyMessage(events[0].replyToken, { type: "text", text: "Hello!!!!"})
    response.json(result)
}
exports.helloWorld = functions.https.onRequest(helloingWorld)

/**
 * sending line message of shopping list
 * @param data 
 * @param context 
 */
const sendingLine = async (data: LineData, context: string): Promise<void> => {
    const client = new line.Client({
        channelAccessToken: configs.manage_stock.access_token,
        channelSecret: configs.manage_stock.channel_secret
    })
    await client.broadcast({ type: "text", text: data.text })
        .then(() =>  console.log('sent line') )
        .catch((err) => console.log(err))
}
exports.sendLine = functions.https.onCall(sendingLine)

exports.sendLine = functions.https.onCall(async (data, context) => {
    const client = new line.Client({
        channelAccessToken: configs.manage_stock.access_token,
        channelSecret: configs.manage_stock.channel_secret
    })
    await client.broadcast({ type: "text", text: data.text })
})

const admin = require('firebase-admin')
admin.initializeApp()