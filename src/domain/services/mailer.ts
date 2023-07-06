export interface IMailerService {
    getEmailData (): Promise<MailerServiceDTO.getEmailDataOutput>
    sendEmail (input: MailerServiceDTO.sendEmailInput): Promise<void>
}

export namespace MailerServiceDTO {
    export type getEmailDataOutput = {
        ownerName: string,
        ownerEmail: string,
        propertyTitle: string,
        propertyId: string
    }[]

    export type sendEmailInput = {
        ownerName: string,
        ownerEmail: string,
        propertyTitle: string,
        propertyId: string
    }
}