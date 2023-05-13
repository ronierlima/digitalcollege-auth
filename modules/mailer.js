const nodemailer = require('nodemailer')
const { host, port, secure, user } = require('../config/mail.json')


const pass = process.env.MAIL_PASS


const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user,
    pass
  }
})

module.exports = transporter


const { MailtrapClient } = require("mailtrap");

const TOKEN = "1b7c6bc92014e6b0f8ba450af00314bd";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

module.exports = client 
