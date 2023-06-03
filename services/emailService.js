const { MailtrapClient } = require("mailtrap");
require('dotenv').config();

const pass = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;
const client = new MailtrapClient({ endpoint: ENDPOINT, token: pass });

const sendForgotPasswordEmail = async (user) => {
    const templateUuid = process.env.RECUPERAR_SENHA_TEMPLATE_UUID;
    const templateVariables = {
        user_email: user.email,
        code: 111
        // outras variáveis específicas para a recuperação de senha, se necessário
    };

    const emailOptions = {
        from: {
            email: process.env.MAIL_SENDER_EMAIL,
            name: process.env.MAIL_SENDER_NAME,
        },
        to: [{ email: user.email }],
        template_uuid: templateUuid,
        template_variables: templateVariables,
    };

    return client.send(emailOptions);
};

const sendWelcomeEmail = async (user) => {

    console.log("vou")
    const templateUuid = process.env.BEM_VINDO_TEMPLATE_UUID;
    const templateVariables = {
        user_email: user.email,
        user_name: user.name,
        // outras variáveis específicas para o e-mail de boas-vindas, se necessário
    };

    const emailOptions = {
        from: {
            email: process.env.MAIL_SENDER_EMAIL,
            name: process.env.MAIL_SENDER_NAME,
        },
        to: [{ email: user.email }],
        template_uuid: templateUuid,
        template_variables: templateVariables,
    };

    return client.send(emailOptions);
};

const sendPasswordUpdateEmail = async (user) => {
    const templateUuid = process.env.ATUALIZACAO_SENHA_TEMPLATE_UUID;
    const templateVariables = {
        user_email: user.email,
        // outras variáveis específicas para o e-mail de atualização de senha, se necessário
    };

    const emailOptions = {
        from: {
            email: process.env.MAIL_SENDER_EMAIL,
            name: process.env.MAIL_SENDER_NAME,
        },
        to: [{ email: user.email }],
        template_uuid: templateUuid,
        template_variables: templateVariables,
    };

    return client.send(emailOptions);
};

module.exports = {
    sendForgotPasswordEmail,
    sendWelcomeEmail,
    sendPasswordUpdateEmail,
};
