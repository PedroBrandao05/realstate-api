import { inject, injectable } from "inversify";
import { IMailerService, MailerServiceDTO } from "../../domain/services/mailer";
import IOwnerRepository from "../../domain/repositories/owner";
import IPropertyRepository from "../../domain/repositories/property";
import { IMailer } from "../contracts/mailer";

@injectable()
export default class MailerService implements IMailerService {
    constructor (
        @inject('IOwnerRepository') private readonly ownerRepository: IOwnerRepository,
        @inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
        @inject('IMailer') private readonly mailer: IMailer
    ){}

    async getEmailData(): Promise<MailerServiceDTO.getEmailDataOutput> {
        const properties = await this.propertyRepository.findAll()
        const dataForEmails: MailerServiceDTO.getEmailDataOutput = []
        for (const property of properties) {
            const owner = await this.ownerRepository.findById(property.ownerId)
            dataForEmails.push({ownerName: owner.name, ownerEmail: owner.email, propertyTitle: property.title, propertyId: property.id})
        }
        return dataForEmails
    }

    async sendEmail(email: MailerServiceDTO.sendEmailInput): Promise<void> {
        await this.mailer.send(email)
    }
}