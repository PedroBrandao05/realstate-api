import { MailerServiceDTO } from "../../domain/services/mailer";

export interface IMailer {
    send (data: MailerServiceDTO.sendEmailInput): Promise<void>
}