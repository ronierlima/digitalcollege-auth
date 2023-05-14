const { MailtrapClient } = require("mailtrap");

const pass = process.env.MAIL_PASS

const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: pass });

module.exports = client 
