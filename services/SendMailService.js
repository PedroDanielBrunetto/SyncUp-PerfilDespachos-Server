const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const mailConfig = require("../config/mail");

class SendMailService {
  async execute({ nome, email, mensagem }) {
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "../views",
      "contact_mail.hbs"
    );

    const templateFileContent = fs.readFileSync(forgotPasswordTemplate, "utf-8");
    const parseTemplate = handlebars.compile(templateFileContent);
    const html = parseTemplate({ nome, email, mensagem });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.DEFAULT_FROM_EMAIL,
        pass: process.env.DEFAULT_PASS_EMAIL,
      },
    });

    await transporter.sendMail({
      from: {
        name: mailConfig.defaults.from.name,
        address: mailConfig.defaults.from.email,
      },
      to: "pedrodanielbm@hotmail.com", // Destinatário
      subject: "[SyncUp Brasil] Prospecção de Negócios",
      html,
    });

    return "E-mail enviado com sucesso!";
  }
}

module.exports = new SendMailService();
