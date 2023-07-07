import nodemailer from 'nodemailer'
import { injectable } from 'inversify'
import { IMailer } from '../../application/contracts/mailer'
import fs from 'fs'
import { MailerServiceDTO } from '../../domain/services/mailer'

interface IMailConfigs {
  port: number,
  host: string,
  auth: {
    user: string,
    pass: string
  }
}



@injectable()
export default class Mailer implements IMailer {
  private readonly transporter!: nodemailer.Transporter
  private readonly fileSystem = fs
  constructor()
  {
    
  }

  async send(data: MailerServiceDTO.sendEmailInput): Promise<void> {
      
  }
}