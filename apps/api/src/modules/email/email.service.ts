import nodemailer from "nodemailer";

import { config } from "@/config/config";
import { logger } from "@/common/logger/logger";

import { Message } from "./email.interfaces";

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

export const emailService = {
  sendEmail: async (
    to: string,
    subject: string,
    text: string,
    html: string
  ): Promise<void> => {
    const msg: Message = {
      from: config.email.from,
      to,
      subject,
      text,
      html,
    };
    await transport.sendMail(msg);
  },

  sendResetPasswordEmail: async (to: string, token: string): Promise<void> => {
    const subject = "Reset password";
    const resetPasswordUrl = `${config.clientUrl}/reset-password?token=${token}`;
    const text = `Hi,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
    const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Dear user,</strong></h4>
    <p>To reset your password, click on this link: ${resetPasswordUrl}</p>
    <p>If you did not request any password resets, please ignore this email.</p>
  <p>Thanks,</p>
  <p><strong>Obvio Team</strong></p></div>`;

    await emailService.sendEmail(to, subject, text, html);
  },
};
